'use strict';

var _ = require('lodash');
var Img = require('./img.model');
var fs = require('fs');
var User = require('../user/user.model');

// Get list of imgs
exports.index = function(req, res) {
  Img.find(function (err, imgs) {
    if(err) { return handleError(res, err); }
    return res.json(200, imgs);
  });
};

// Get a single img
exports.show = function(req, res) {
  Img.findById(req.params.id, function (err, img) {
    if(err) { return handleError(res, err); }
    if(!img) { return res.send(404); }
    return res.json(img);
  })
  .populate('studentsApplied')
};

// Creates a new img in the DB.
exports.create = function(req, res) {
  // console.log(req.file);
  // return res.json(201, {message: "Boom!"});
  Img.create(req.body, function(err, img) {
    if(err) { return handleError(res, err); }
    User.findByIdAndUpdate(req.body.createdBy, {$push: {"projectsCreated": img._id}}, {new : true}, function(err, model){
      return res.json(201, img);
    })   
  });
};

exports.download = function (req, res) {
  var file = req.params.fileName;
  var path = 'client/assets/companies/' + file;
  console.log(path);
  res.download(path);
}

exports.getFiles = function (req, res) {
  fs.readdir('client/assets/companies/', function(err, items) {
    console.log(items);
    res.json(items);
  });
}

exports.downloadResume = function (req, res) {
  var file = req.params.fileName;
  var path = 'client/assets/uploads/' + req.params.projid + '/' + file;
  console.log(path);
  res.download(path);
}

exports.getFilesForProj = function (req, res) {
  fs.readdir('client/assets/uploads/' + req.params.projid + '/', function(err, items) {
    console.log(items);
    res.json(items);
  });
}

// Updates an existing img in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Img.findById(req.params.id, function (err, img) {
    if (err) { return handleError(res, err); }
    if(!img) { return res.send(404); }
    var updated = _.merge(img, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, img);
    });
  });
};

// Deletes a img from the DB.
exports.destroy = function(req, res) {
  Img.findById(req.params.id, function (err, img) {
    if(err) { return handleError(res, err); }
    if(!img) { return res.send(404); }
    img.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
