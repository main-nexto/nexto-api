'use strict';

var url = require('url');

var courseService = require('../services/firebase/firebaseService');

module.exports.getAllCourses = function getAllCourses (req, res, next) {
  courseService.getAllCourses(req.swagger.params, res, next);
};

module.exports.getCoursesById = function getCoursesById (req, res, next) {
  courseService.getCoursesById(req.swagger.params, res, next);
};

module.exports.patchCoursesById = function patchCoursesById (req, res, next) {
  courseService.patchCoursesById(req.swagger.params, res, next);
};

module.exports.postCourse = function postCourse (req, res, next) {
  courseService.postCourse(req.swagger.params, res, next);
};

module.exports.putCoursesById = function putCoursesById (req, res, next) {
  courseService.putCoursesById(req.swagger.params, res, next);
};

module.exports.deleteCoursesById = function deleteCoursesById (req, res, next) {
  courseService.deleteCoursesById(req.swagger.params, res, next);
};

module.exports.joinCourse = function joinCourse (req, res, next) {
  courseService.joinCourse(req.swagger.params, res, next);
};
