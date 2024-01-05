const Courses = require('../models/Course');

exports.create = (coursesData) => Courses.create(coursesData);

exports.getAll = () => Courses.find().lean();

exports.getOne = (courseId) => Courses.findById(courseId).populate('buyer');

exports.delete = (courseId) => Courses.findByIdAndDelete(courseId);

exports.updateOne = (courseId, coursesData) => Courses.findByIdAndUpdate(courseId, coursesData);
