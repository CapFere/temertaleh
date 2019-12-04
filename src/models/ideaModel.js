const mongoose = require('mongoose');
const Polls = require('./pollModel');

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
    minlength: [10, 'Description must be atleast 40 letters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Idea must belong to user'],
    ref: 'User'
  },
  approved: {
    type: Boolean,
    default: false
  },
  upVote: {
    type: Number,
    default: 0
  },
  downVote: {
    type: Number,
    default: 0
  },
  hasVoted: {
    type: Boolean,
    default: null
  },
  poll:{
    type:mongoose.Types.ObjectId,
    default:null
  }
});

module.exports = mongoose.model('Idea', ideaSchema);
