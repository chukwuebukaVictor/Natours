const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

const getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  //   res.setHeader('Content-Security-Policy', "script-src 'self'");

  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  res
    // .setHeader('Content-Security-Policy', "script-src 'unsafe-inline'")
    .status(200)
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login into your account',
  });
};

module.exports = { getOverview, getTour, getLoginForm };
