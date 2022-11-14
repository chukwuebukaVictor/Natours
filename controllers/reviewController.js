const Review = require('../models/reviewModel');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');
const { deleteOne, updateOne, createOne, getOne } = require('./handlerFactory');

const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});

const setTourUsersIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getReview = getOne(Review);
const createReview = createOne(Review);
const updateReview = updateOne(Review);
const deleteTour = deleteOne(Review);

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteTour,
  updateReview,
  setTourUsersIds,
};
