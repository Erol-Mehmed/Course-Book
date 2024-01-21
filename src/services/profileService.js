const User = require('../models/User');
const Course = require('../models/Course');

exports.getUserById = (userId) => User.findById(userId).lean();

exports.getCourseByUserId = (userId) => Course.find({ owner: userId }).lean();

exports.getSignUpCoursesByUserId = (userId) => Course.find({ signUpList: { $elemMatch: { userId } } }).lean();
