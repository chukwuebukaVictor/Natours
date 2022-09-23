const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  //Check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');
  //   console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }
  //if everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //Get the token and check if it is there
  let token;
  if (
    req.headers.authorisation &&
    req.headers.authorisation.startsWith('Bearer')
  ) {
    token = req.headers.authorisation.split(' ')[1];
  }
  //   console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  //Token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this  token no longer exist', 401)
    );
  }
  //Check if user changed password after the token was issued
  if (await currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }
  console.log(await currentUser.changedPasswordAfter(decoded.iat));

  //Grant access to protected route
  req.user = currentUser;
  next();
});
