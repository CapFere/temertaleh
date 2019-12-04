const express = require('express');

const { login, signup,getCurrentUser,updateCurrentUser,verifyUser,profilePicture } = require('./../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/img/profile',profilePicture)
router.use(verifyUser);

router.route('/profile')
.get(getCurrentUser)
.patch(updateCurrentUser);

module.exports = router;
