const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have username'],
    unique: true,
    maxlength: [20, 'Username must be at most 20 letters'],
    minlength: [4, 'Username must be atleast 4 letters']
  },
  password: {
    type: String,
    required: [true, 'User must have password'],
    minlength: [6, 'Password must be atleast 6 charachters']
  },
  firstName: {
    type: String,
    required: [true, 'User must have First Name'],
    unique: true,
    maxlength: [20, 'First Name must be at most 20 letters'],
    minlength: [4, 'First Name must be atleast 4 letters']
  },
  lastName: {
    type: String,
    required: [true, 'User must have Last Name'],
    unique: true,
    maxlength: [20, 'Last Name must be at most 20 letters'],
    minlength: [4, 'Last Name must be atleast 4 letters']
  },
  sex: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: 'Sex is either Male or Female'
    },
    default: 'Male'
  },
  proffession: String,
  roleInGDG: String,
  phonenumber: String,
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Role is either user or admin'
    },
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userShcema);
