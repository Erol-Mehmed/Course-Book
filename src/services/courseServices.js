const Courses = require('../models/Course');

exports.create = (coursesData) => Courses.create(coursesData);

exports.getLastThreeCourses = () => Courses.find().sort({ _id: -1 }).limit(3).lean();

exports.getOne = (courseId) => Courses.findById(courseId);

exports.getAll = () => Courses.find().lean();

exports.delete = (courseId) => Courses.findByIdAndDelete(courseId);

exports.updateOne = (courseId, coursesData) => Courses.findByIdAndUpdate(courseId, coursesData);

exports.enroll = (courseId, userId) => Courses.findByIdAndUpdate(courseId, { $push: { signUpList: userId }}, { new: true });
