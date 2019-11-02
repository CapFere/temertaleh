const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Poll must belong to user']
  },
  idea: {
    type: String,
    required: [true, 'Poll must belong to idea']
  },
  isApproved: {
    type: Boolean,
    default: null
  }
});

module.exports = mongoose.model('Idea', ideaSchema);
