'use strict';

var express = require('express');
var app = express()
var controller = require('./img.controller');
var multer  = require('multer')
var storage = require('../../components/imageStorage').storage;
var upload = multer({ storage: storage, limits: {fileSize: 1000000}});
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
// router.post('/', upload.single('file'), controller.create);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
