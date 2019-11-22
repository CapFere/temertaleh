const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const { catchAsync } = require('./errorController');

const getToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Username or Password Missing', 400));
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError('Invalid Username or Password', 401));
  }

  const token = getToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: { user }
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = getToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user }
  });
});

exports.verifyUser = catchAsync(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Your not logged in', 401));
  }

  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(id);
  if (!user) {
    return next(
      new AppError('User related to this token no longer exists', 401)
    );
  }
  req.user = user;

  next();
});

exports.restrictUser = (...allowedRoles) => {
  return catchAsync(async (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError('Your not authorized to do this operation', 403)
      );
    }
    next();
  });
};
