const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteTour,
  updateReview,
  setTourUsersIds,
  getReview,
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
    setTourUsersIds,
    createReview
  );

router.route('/:id').patch(updateReview).delete(deleteTour).get(getReview);

module.exports = router;
