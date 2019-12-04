const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const { errorHandler } = require('./src/controllers/errorController');
const AppError = require('./src/utils/appError');

const authRouter = require('./src/routes/authRoute');
const userRouter = require('./src/routes/userRoute');
const ideaRouter = require('./src/routes/ideaRoute');
const pollRouter = require('./src/routes/pollRoute');
const statRouter = require('./src/routes/statRoute');

//BASIC SETUP
const app = express();
dotenv.config();

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json('12kb'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
//Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/ideas', ideaRouter);
app.use('/api/v1/polls', pollRouter);
app.use('/api/v1/stats', statRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`There is no url of ${req.url}`, 404));
});

//ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

//DATABASE CONNECTION

const db_url = process.env.DATABASE_ATLAS.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to database successfully'));

//STARTING THE SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCETION');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
