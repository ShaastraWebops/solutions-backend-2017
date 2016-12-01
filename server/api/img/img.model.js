'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImgSchema = new Schema({
  name: String,
  description: String,
  incentives: String,
  studentsApplied: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Img', ImgSchema);
