var multer  = require('multer');
var mkdirp = require('mkdirp');
var mime = require('mime');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	var fullname = file.originalname;
  	console.log(fullname);
    return cb(null, 'client/assets/companies');
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    return cb(null, file.originalname + "." + mime.extension(file.mimetype));
  }
});

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
  	var fullname = file.originalname;
  	var ids = fullname.split("-");
  	console.log(ids);
  	mkdirp('./client/assets/uploads/' + ids[0], function (err) {
    	if (err) console.error(err)
    	else{
    		return cb(null, 'client/assets/uploads/' + ids[0]);
    	}
	});
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    return cb(null, file.originalname + "." + mime.extension(file.mimetype));
  }
});

exports.storage = storage;
exports.storage2 = storage2;

