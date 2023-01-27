'use strict';

var url = require('url');

var courseService = require('../services/communityService');

module.exports.getAllCommunities = function getAllCommunities (req, res, next) {
  courseService.getAllCommunities(req.swagger.params, res, next);
};

module.exports.getCommunitiesById = function getCommunitiesById (req, res, next) {
  courseService.getCommunitiesById(req.swagger.params, res, next);
};

module.exports.patchCommunitiesById = function patchCommunitiesById (req, res, next) {
  courseService.patchCommunitiesById(req.swagger.params, res, next);
};

module.exports.postCourse = function postCourse (req, res, next) {
  courseService.postCourse(req.swagger.params, res, next);
};

module.exports.putCommunitiesById = function putCommunitiesById (req, res, next) {
  courseService.putCommunitiesById(req.swagger.params, res, next);
};

module.exports.deleteCommunitiesById = function deleteCommunitiesById (req, res, next) {
  courseService.deleteCommunitiesById(req.swagger.params, res, next);
};
