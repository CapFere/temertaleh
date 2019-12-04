const express = require('express');

const {
  login,
  signup,
  verifyUser,
  profilePicture
} = require('./../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/img/profile', verifyUser, profilePicture);

module.exports = router;
