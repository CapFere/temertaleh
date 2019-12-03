const Idea = require('./../models/ideaModel');
const Poll = require('./../models/pollModel');
const { catchAsync } = require('./../controllers/errorController');
const APIFeatures = require('./../utils/apiFeatures');
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
exports.getAllIdea = catchAsync(async (req, res, next) => {
  let query = Idea.find();
  query.populate('user');
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();
  let ideas = await features.query;
  ideas = await Promise.all(
    ideas.map(async idea => {
      const poll = await Poll.findOne({ user: req.user._id, idea: idea._id });
      if (poll) {
        idea.hasVoted = poll.vote;
      } else {
        idea.hasVoted = null;
      }
      return idea;
    })
  );
  res
    .status(200)
    .json({ status: 'success', results: ideas.length, data: { ideas } });
});
exports.getIdea = getOne(Idea);
exports.createIdea = createOne(Idea);
exports.updateIdea = updateOne(Idea);
exports.deleteIdea = deleteOne(Idea);
