const Poll = require('./../models/pollModel');

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./../utils/factoryHandler');

exports.setIdeaAndUserId = (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  req.body.idea = req.body.idea || req.params.ideaId;
  next();
};

exports.getAllPoll = getAll(Poll);
exports.getPoll = getOne(Poll);
exports.createPoll = createOne(Poll);
exports.updatePoll = updateOne(Poll);
exports.deletePoll = deleteOne(Poll);
