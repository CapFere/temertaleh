const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
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
