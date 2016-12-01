/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Img = require('./img.model');

exports.register = function(socket) {
  Img.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Img.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('img:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('img:remove', doc);
}