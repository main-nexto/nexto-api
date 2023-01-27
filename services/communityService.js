'use strict';
var low	= require('lowdb');
const db = low('db.json');

/**
 * Get All communities
 * @param args name (String)
 * @param res List of communities
 * @param next 
**/
exports.getAllCommunities = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var result = '';
  if (args.name.value) {
    result = db.get('communities').filter(community => 
      community.name.toLowerCase().includes(args.name.value.toLowerCase()) ).value();
  } else {
    result = db.get('communities').value();
  }
  res.statusCode = 200;
  res.end(JSON.stringify(result));
}

function uuid() {
	return 'x'.replace(/[x]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

/**
 * Save community
 * @param args community (Community) 
 * @param res community (Community) 
 * @param next 
 */
exports.postCommunity = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  var result = db.get('communities')
	  .push({ id: uuid(), name: args.community.value.name })
	  .value()
  res.end(JSON.stringify(result));
}

/**
 * Get community by Id
 * @param args id (String) 
 * @param res community (Community) 
 * @param next 
**/
exports.getCommunitiesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(db.get('communities').find({ id: args.id.value }).value()));
}

/**
 * Update Community
 * @param args id (String) 
 * @param res community (Community) 
**/
exports.putCommunitiesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  var result = db.get('communities')
  	.find({ id: args.id.value })
	  .assign({ name: args.community.value.name})
	  .value()
  res.end(JSON.stringify(result));
}

/**
 * Delete Community
 * @param args id (String) 
 * @param res community (Community) 
 * @param next 
**/
exports.deleteCommunitiesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;
  db.get('communities')
	  .remove({ id: args.id.value })
	  .value()
  res.end();
}
