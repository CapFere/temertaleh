const exprss = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

//BASIC SETUP
const app = exprss();
dotenv.config();

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database successfully'));

//STARTING THE SERVER
const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
