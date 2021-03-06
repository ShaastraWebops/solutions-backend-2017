'use strict';

var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Img = require('../img/img.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

exports.getCompanies = function(req, res) {
  User.find({role: 'company', isApproved: false}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

// Updates an existing user in the DB.
 exports.update = function(req, res) {
   if(req.body._id) { delete req.body._id; }
   User.findById(req.params.id, function (err, img) {
     if (err) { return handleError(res, err); }
     if(!img) { return res.send(404); }
     var updated = _.merge(img, req.body);
     updated.save(function (err) {
       if (err) { return handleError(res, err); }
       return res.json(200, img);
     });
  });
 };
// exports.update = function(req, res) {
//   var oldPass = String(req.body.oldPassword);
//   if(req.body._id) { delete req.body._id; }
//   User.findById(req.params.id, function (err, img) {
//     if (err) { return handleError(res, err); }
//     if(!img) { return res.send(404); }
//     if(user.authenticate(oldPass)) {
//       var updated = _.merge(img, req.body);
//       updated.save(function (err) {
//         if (err) { return handleError(res, err); }
//         return res.json(200, img);
//       });
//     }  
//   });
// };


//Apply for a project
exports.applyForProject = function (req, res, next) {
  console.log(req.body);
  var duplicate = 0;
  User.findById(req.body.userid, function(err, user){
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    else {
      var projectsApplied = user.projectsApplied;
      for(var i=0; i<projectsApplied.length; i++){
        if(projectsApplied[i] == req.body.projectid){
          duplicate = 1;
        }
      }
      console.log(duplicate);
      if(duplicate == 0){
        User.findByIdAndUpdate(req.body.userid, {$push: {"projectsApplied": req.body.projectid}}, {new : true}, function(err, model){
          if(err){ return handleError(res, err); }
          Img.findByIdAndUpdate(req.body.projectid, {$push: {"studentsApplied": req.body.userid}}, {new : true}, function(err, img){
            if(err){ return handleError(res, err); }    
            return res.json(201, img);
          });
        });
      }
      else{
        return res.status(204).json("You have already applied for this project");
      }

    }
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};
/**
 * Updates a user's profile
 */
exports.upProfile = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newName = String(req.body.name);
  var newEmail = String(req.body.email);
  var newPhone = String(req.body.phone);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.name = newName;
      user.email = newEmail;
      user.phone = newPhone;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  })
  .populate('projectsCreated')
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
