const express = require('express');

const { dashboardStat } = require('../controllers/statController');

const { verifyUser } = require('./../controllers/authController');
router = express.Router();
router.use(verifyUser);
router.get('/dashboard', dashboardStat);

module.exports = router;
