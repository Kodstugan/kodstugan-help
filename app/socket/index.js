"use strict";

module.exports = function (app, io) {
  io.on('connection', function (socket) {
    socket.on('client/login', function (token) {});
    socket.on('client/logout', function (id) {});
    socket.on('client/question-add', function (message) {});
    socket.on('client/question-del', function (message) {});
    socket.on('client/question-comment-add', function (message) {});
    socket.on('client/question-comment-del', function (message) {});
  });
};