'use strict';

var url = require('url');

var communityService = require('../services/firebase/firebaseService');

module.exports.getAllCommunities = function getAllCommunities (req, res, next) {
  communityService.getAllCommunities(req.swagger.params, res, next);
};

module.exports.getCommunitiesById = function getCommunitiesById (req, res, next) {
  communityService.getCommunitiesById(req.swagger.params, res, next);
};

module.exports.patchCommunitiesById = function patchCommunitiesById (req, res, next) {
  communityService.patchCommunitiesById(req.swagger.params, res, next);
};

module.exports.postCommunity = function postCommunity (req, res, next) {
  communityService.postCommunity(req.swagger.params, res, next);
};

module.exports.putCommunitiesById = function putCommunitiesById (req, res, next) {
  communityService.putCommunitiesById(req.swagger.params, res, next);
};

module.exports.deleteCommunitiesById = function deleteCommunitiesById (req, res, next) {
  communityService.deleteCommunitiesById(req.swagger.params, res, next);
};
