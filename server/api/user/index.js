'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multer  = require('multer');
var storage2 = require('../../components/imageStorage').storage2;
var upload = multer({ storage: storage2, limits: {fileSize: 1000000}});

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/companies', auth.hasRole('admin'), controller.getCompanies);
router.delete('/:id', controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/apply', upload.single('file'), controller.applyForProject);

module.exports = router;
