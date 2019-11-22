const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const { errorHandler } = require('./controllers/errorController');
const AppError = require('./utils/appError');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const ideaRouter = require('./routes/ideaRoute');
const pollRouter = require('./routes/pollRoute');

//BASIC SETUP
const app = express();
dotenv.config();

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json('12kb'));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/ideas', ideaRouter);
app.use('/api/v1/polls', pollRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`There is no url of ${req.url}`, 404));
});

//ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

//DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to database successfully'));

//STARTING THE SERVER
const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
