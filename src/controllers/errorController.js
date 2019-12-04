const AppError = require('./../utils/appError');
exports.catchAsync = controller => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

const sendDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Opps, Something went wrong!!'
    });
  }
};

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevelopment(err, res);
  } else {
    if (err.name === 'CastError') {
      err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    } else if (err.code === 11000) {
      const message = err.errmsg.match(/"(.*?)"/g);
      err = new AppError(`Duplicate value ${message ? message[0] : ''}`, 400);
    } else if (err.name === 'ValidationError') {
      const message = Object.values(err.errors)
        .map(error => error.message)
        .join(', ');
      err = new AppError(`Invalid data: ${message}`, 400);
    } else if (err.name === 'JsonWebTokenError') {
      err = new AppError('Invalid token', 401);
    } else if (err.name === 'TokenExpiredError') {
      err = new AppError('The token has expired', 401);
    }
    sendDevelopment(err, res);
  }
  next();
};
