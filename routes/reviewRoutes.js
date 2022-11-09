const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteTour,
} = require('../controllers/reviewController');
const authController = require('../controllers/authController');

//To have access to the nexted parameter in tour routes
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    createReview
  );

router.route('/:id').delete(deleteTour);

module.exports = router;
