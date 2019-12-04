const express = require('express');

const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { verifyUser, restrictUser } = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(verifyUser, restrictUser('admin'), getAllUser)
  .post(verifyUser, restrictUser('admin'), createUser);

router
  .route('/:id')
  .get(verifyUser, restrictUser('admin'), getUser)
  .patch(verifyUser, restrictUser('admin'), updateUser)
  .delete(verifyUser, restrictUser('admin'), deleteUser);

module.exports = router;
