const User = require('./../models/userModel');
const { catchAsync } = require('./errorController');

const {
  getAll,
  getOne,
  createOne,
  updateOne
} = require('./../utils/factoryHandler');

exports.getAllUser = getAll(User);
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
