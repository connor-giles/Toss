const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    domain: null,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  user.credentials = undefined;

  res.status(statusCode).cookie('jwt', token, cookieOptions).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    credentials: req.body.credentials,
    email: req.body.email,
    MFT: req.body.MFT,
    responses: req.body.responses,
    credentialsConfirm: req.body.credentialsConfirm,
  });

  createSendToken(newUser, 201, res);
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, credentials } = req.body;

  // 1 Check if email and password exist
  if (!email || !credentials) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2 Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+credentials');

  // first statement checks if user was found. with the specific email, and second checks if the inputted password matches that email
  if (
    !user ||
    !(await user.correctCredentials(credentials, user.credentials))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3 If everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token;

  //1 Get token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //splits string into an array in which elements are divided by a space (' ')
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log('inside cookies');
  } else {
    return res.status(201).json({
      isLoggedIn: 0,
    });
  }
  //2 Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3 Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );

  //4 Check if 'user' changed credentials after the token was issued
  if (freshUser.changedCredentialsAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  if (!freshUser) {
  } else {
    return res.status(201).json({
      isLoggedIn: 1,
    });
  }
});

// MIDDLEWARE: Protected routes
// Creates 'user' object on req object which contains the logged in User
// for middleware following .protect, you can use 'user' to refer to the logged in User
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1 Get token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //splits string into an array in which elements are divided by a space (' ')
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, please log in for access!', 401)
    );
  }

  //2 Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3 Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );

  //4 Check if 'user' changed credentials after the token was issued
  if (freshUser.changedCredentialsAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  req.user = freshUser;
  next();
});

// roles is an array of parameters for which to restrict access to
// this is a necessary approach since Middleware aren't supposed to have other parameters passed into them
exports.restrictToRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.updateCredentials = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+credentials');

  // 2) Check if POSTed current credentials is correct
  if (
    !(await user.correctCredentials(
      req.body.credentialsCurrent,
      user.credentials
    ))
  ) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update credentials
  user.credentials = req.body.credentials;
  user.credentialsConfirm = req.body.credentialsConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

exports.restrictToResponded = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
