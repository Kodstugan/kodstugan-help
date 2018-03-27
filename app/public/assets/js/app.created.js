"use strict";

const created = function () {
  socket.on('client/onLogin', function (data) {
    app.id = data.id;
    app.name = data.name;
    app.picture = "https://graph.facebook.com/" + data.id + "/picture?type=large";
    app.questions = data.questions;
    app.misc.canPost = data.canPost;
  });

  socket.on('client/onQuestionAdd', function (data) {
    Vue.set(app.questions, data.key, data.question);
  });

  socket.on('client/onQuestionRemove', function (data) {
    Vue.delete(app.questions, data.key);
  });

  socket.on('client/onCooldownRemove', function (data) {
    app.misc.canPost = true;
  });
};