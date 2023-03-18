'use strict';
var firebase = require('firebase-admin');
var serviceAccount = require('../../service-account-file.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://nexto-api-default-rtdb.firebaseio.com',
});

var db = firebase.database();
var coursesRef = db.ref('courses');
var communitiesRef = db.ref('communities');

const CourseStatus = {
  NotPurchased: 0,
  Purchased: 1
}

module.exports.getInstance = function() {
  return firebase;
}

/**
 * Get All courses
**/
exports.getAllCourses = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var name = args.name.value;
  var result = [];
  if (args.name.value) {
    coursesRef
    .orderByChild('id')
    .on('value', (snapshot) => {
     
      snapshot.forEach((childSnapshot) => {
        const course = childSnapshot.val();
        if (course.name.toLowerCase().includes(name.toLowerCase())) {
            result.push(course);
        }
      });

      let jsonResult = JSON.stringify(Object.values(result));
      res.statusCode = 200;
      res.end(jsonResult);
    });

  } else {
    coursesRef
    .orderByChild('id')
    .on('value', (snapshot) => {
     
      snapshot.forEach((childSnapshot) => {
        const course = childSnapshot.val();
        result.push(course);
      });

      let jsonResult = JSON.stringify(Object.values(result));
      res.statusCode = 200;
      res.end(jsonResult);
    });
  }
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
  coursesRef
    .child(args.id.value)
    .orderByChild('id')
    .on('value', (snapshot) => {
      res.statusCode = 200;
      let jsonResult = JSON.stringify(snapshot.val());
      res.end(jsonResult);
    });
}

/**
 * Join Course
 * @param args id (String) 
 * @param res course (Course) 
**/
exports.joinCourse = function(args, res, next) {
  var id = args.id.value;
  if (id === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');

  var data = { status: CourseStatus.Purchased};
  coursesRef.child(id).update(data, (err) => {
    if (err) {
      res.send(err);
    } else {
      coursesRef.child(id).once('value', (snapshot) => {
        var course = snapshot.val();
        if (course == null) {
          res.status(404).send({ status: 404, error: 'Course not found' });
        } else {
          res.statusCode = 200;
          let jsonResult = JSON.stringify(course);
          res.end(jsonResult);
        }
      });
    }
  });
}

/**
 * Save course
 * @param args course (Course) 
 * @param res course (Course) 
 * @param next 
 */
exports.postCourse = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var newCourseRef = coursesRef.push();
  args.course.value["id"] = newCourseRef.key
  newCourseRef.set(args.course.value, function (err) {
    if (err) {
      res
        .status(500)
        .send({ status: 500, message: 'Internal server error!' });
    } else {
      res
        .status(201)
        .send({ status: 201, message: 'New course created successfully!' });
    }
  });
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
  coursesRef.child(args.id.value).update(args.course.value, (err) => {
    if (err) {
      res.send(err);
    } else {
      coursesRef.child(args.id.value ).once('value', (snapshot) => {
        var course = snapshot.val();
        if (snapshot.val() == null) {
          res.status(404).send({ status: 404, error: 'Course not found' });
        } else {
          res.statusCode = 200;
          let jsonResult = JSON.stringify(course);
          res.end(jsonResult);
        }
      });
    }
  });
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
  coursesRef.child(id).remove((err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send({
        status: 201,
        message: 'Course removed successfully!',
      });
    }
  });
}

/**
 * Get All communities
 * @param args name (String)
 * @param res List of communities
 * @param next 
**/
exports.getAllCommunities = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var name = args.name.value;
  var result = [];
  if (name) {
    communitiesRef
    .orderByChild('id')
    .on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const community = childSnapshot.val();
        if (community.name.toLowerCase().includes(name.toLowerCase())) {
            result.push(community);
        }
      });

      let jsonResult = JSON.stringify(Object.values(result));
      res.statusCode = 200;
      res.end(jsonResult);
    });

  } else {
    communitiesRef
    .orderByChild('id')
    .on('value', (snapshot) => {
     
      snapshot.forEach((childSnapshot) => {
        const community = childSnapshot.val();
        result.push(community);
      });

      res.statusCode = 200;
      let jsonResult = JSON.stringify(Object.values(result));
      res.end(jsonResult);
    });
  }
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
 communitiesRef
   .child(args.id.value)
   .orderByChild('id')
   .on('value', (snapshot) => {
    res.statusCode = 200;
    let jsonResult = JSON.stringify(snapshot.val());
    res.end(jsonResult);
   });
}

/**
 * Save community
 * @param args community (Community) 
 * @param res community (Community) 
 * @param next 
 */
exports.postCommunity = function(args, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var newCommunityRef = communitiesRef.push();
  args.community.value["id"] = communitiesRef.key
  newCommunityRef.set(args.community.value, function (err) {
    if (err) {
      res
        .status(500)
        .send({ status: 500, message: 'Internal server error!' });
    } else {
      res
        .status(201)
        .send({ status: 201, message: 'New community created successfully!' });
    }
  });
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
  communitiesRef.child(args.id.value ).update(args.community.value, (err) => {
    if (err) {
      res.send(err);
    } else {
      communitiesRef.child(args.id.value ).once('value', (snapshot) => {
        if (snapshot.val() == null) {
          res.status(404).send({ status: 404, error: 'Comunity not found' });
        } else {
          res.statusCode = 200;
          let jsonResult = JSON.stringify(snapshot.val());
          res.end(jsonResult);
        }
      });
    }
  });
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
  communitiesRef.child(id).remove((err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send({
        status: 201,
        message: 'Community removed successfully!',
      });
    }
  });
}