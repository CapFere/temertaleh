const mongoose = require('mongoose');
const Idea = require('./ideaModel');
const pollSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Poll must belong to user']
  },
  idea: {
    type: String,
    required: [true, 'Poll must belong to idea']
  },
  vote: {
    type: Boolean,
    required: [true, 'Poll must have vote value']
  }
});

pollSchema.index({ user: 1, idea: 1 }, { unique: true });
pollSchema.statics.calculateVote = async function(ideaId) {
  const stats = await this.aggregate([
    {
      $match: { idea: ideaId }
    },
    {
      $group: {
        _id: '$vote',
        total: { $sum: 1 }
      }
    }
  ]);
  console.log(stats);
  await Idea.findByIdAndUpdate(ideaId, {
    upVote:
      (stats[0] && stats[0]._id === true) || (stats[1] && stats[1]._id === true)
        ? stats[0].total
        : 0,
    downVote:
      (stats[0] && stats[0]._id === false) ||
      (stats[1] && stats[1]._id === false)
        ? stats[0].total
        : 0
  });
};

pollSchema.post('save', async function(doc, next) {
  await this.constructor.calculateVote(doc.idea);
  next();
});

pollSchema.post(/^findOneAnd/, async function(doc, next) {
  await doc.constructor.calculateVote(doc.idea);
  next();
});

module.exports = mongoose.model('Poll', pollSchema);
