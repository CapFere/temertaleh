const Idea = require('./../models/ideaModel');
const User = require('./../models/userModel');
const { catchAsync } = require('./../controllers/errorController');
const APIFeatures = require('./../utils/apiFeatures');

exports.dashboardStat = catchAsync(async (req, res, next) => {
  const totalUser = await User.countDocuments();
  const totalIdea = await Idea.countDocuments();

  const profession = await User.aggregate([
    {
      $group: {
        _id: '$proffession',
        total: { $sum: 1 }
      }
    },
    {
      $addFields: {
        Profession: '$_id'
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ]);
  const gender = await User.aggregate([
    {
      $group: {
        _id: '$sex',
        total: { $sum: 1 }
      }
    },
    {
      $addFields: {
        Gender: '$_id'
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ]);
  res.json({
    status: 'success',
    stats: {
      totalUser,
      totalIdea,
      participation: { profession, gender }
    }
  });
});
