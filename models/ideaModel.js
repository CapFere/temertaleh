const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Idea must have title'],
    maxlength: [20, 'Username must be at most 20 letters'],
    minlength: [4, 'Username must be atleast 4 letters']
  },
  description: {
    type: String,
    required: [true, 'Description must have title'],
    maxlength: [2000, 'Description must be at most 2000 letters'],
    minlength: [40, 'Description must be atleast 40 letters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Idea must belong to user']
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
  numberOfApproves: {
    type: Number,
    default: 0
  },
  numberOfDeclines: {
    type: Number,
    default: 0
  },
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Idea', ideaSchema);
