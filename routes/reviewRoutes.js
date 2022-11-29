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

router.use(authController.protect)

router
  .route('/')
  .get(getAllReviews)
  .post(
    authController.restrictTo('user'),
    setTourUsersIds,
    createReview
  );

router.route('/:id').patch(authController.restrictTo('user', 'admin'), 
updateReview).delete(authController.restrictTo('user', 'admin'),
deleteTour).get(getReview);

module.exports = router;
