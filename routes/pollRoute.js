const express = require('express');

const {
  getAllPoll,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll,
  setIdeaAndUserId
} = require('../controllers/pollController');

const { verifyUser } = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(verifyUser);

router
  .route('/')
  .get(getAllPoll)
  .post(setIdeaAndUserId, createPoll);

router
  .route('/:id')
  .get(getPoll)
  .patch(updatePoll)
  .delete(deletePoll);

module.exports = router;
