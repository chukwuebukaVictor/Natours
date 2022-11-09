const express = require('express');
const {
  createReview,
  getAllReviews,
} = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    createReview
  );

module.exports = router;
