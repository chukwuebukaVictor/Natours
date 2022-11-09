const Review = require('../models/reviewModel');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

module.exports = {
  getAllReviews,
  createReview,
};
