const express = require('express');

<<<<<<< HEAD
const {
  login,
  signup,
  verifyUser,
  profilePicture
} = require('./../controllers/authController');
=======
const { login, signup,getCurrentUser,updateCurrentUser,verifyUser,profilePicture } = require('./../controllers/authController');
>>>>>>> 5f0c3c107b4b17fba241a730517e3b9587f68437

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/img/profile',profilePicture)
router.use(verifyUser);

router.route('/profile')
.get(getCurrentUser)
.patch(updateCurrentUser);

router.get('/img/profile', verifyUser, profilePicture);

module.exports = router;
