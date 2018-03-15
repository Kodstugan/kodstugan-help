"use strict";

module.exports = function (app, io) {
  io.on('connection', function (socket) {
    socket.emit('client/update-info', {id: socket.request.user.id, name: socket.request.user.displayName});

    socket.on('client/question-add', function (message) {
    });
    socket.on('client/question-del', function (message) {
    });
    socket.on('client/question-comment-add', function (message) {
    });
    socket.on('client/question-comment-del', function (message) {
    });
  });
};