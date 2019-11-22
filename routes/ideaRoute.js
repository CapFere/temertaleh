const express = require('express');

const pollRouter = require('./pollRoute');
const {
  getAllIdea,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
  setUserId
} = require('../controllers/ideaController');

const { verifyUser } = require('./../controllers/authController');

const router = express.Router();

router.use('/:ideaId/polls', pollRouter);

router.use(verifyUser);

router
  .route('/')
  .get(getAllIdea)
  .post(setUserId, createIdea);

router
  .route('/:id')
  .get(getIdea)
  .patch(updateIdea)
  .delete(deleteIdea);

module.exports = router;
