const Idea = require('./../models/ideaModel');

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./../utils/factoryHandler');

exports.setUserId = (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  next();
};
exports.getAllIdea = getAll(Idea);
exports.getIdea = getOne(Idea);
exports.createIdea = createOne(Idea);
exports.updateIdea = updateOne(Idea);
exports.deleteIdea = deleteOne(Idea);
