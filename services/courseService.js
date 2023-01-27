'use strict';
var low	= require('lowdb');
const db = low('db.json');

/**
 * Get All courses
**/
exports.getAllCourses = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var result = '';
  if (args.name.value) {
    result = db.get('courses').filter(course => 
      course.name.toLowerCase().includes(args.name.value.toLowerCase()) ).value();
  } else {
    result = db.get('courses').value();
  }
  res.statusCode = 200;
  res.end(JSON.stringify(result));
}

function uuid() {
	return 'x'.replace(/[x]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

/**
 * Save course
 * @param args course (Course) 
 * @param res course (Course) 
 * @param next 
 */
exports.postCourse = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  var result = db.get('courses')
	  .push({ id: uuid(), name: args.course.value.name })
	  .value()
  res.end(JSON.stringify(result));
}

/**
 * Get course by Id
 * @param args id (String) 
 * @param res course (Course) 
 * @param next 
**/
exports.getCoursesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(db.get('courses').find({ id: args.id.value }).value()));
}

/**
 * Update Course
 * @param args id (String) 
 * @param res course (Course) 
**/
exports.putCoursesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  var result = db.get('courses')
  	.find({ id: args.id.value })
	  .assign({ name: args.course.value.name})
	  .value()
  res.end(JSON.stringify(result));
}

/**
 * Delete Course
 * @param args id (String) 
 * @param res course (Course) 
**/
exports.deleteCoursesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;
  db.get('courses')
	  .remove({ id: args.id.value })
	  .value()
  res.end();
}
