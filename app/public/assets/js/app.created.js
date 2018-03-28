"use strict";

const created = function () {
  socket.on('client/onLogin', function (data) {
    store.setId(data.id);
    store.setName(data.name);
    store.setPicture("https://graph.facebook.com/" + data.id + "/picture?type=large");
    store.setQuestions(data.questions);
    store.setCooldown(data.cooldown);
  });

  socket.on('client/onQuestionAdd', function (data) {
    Vue.set(app.questions, data.key, data.question);
  });

  socket.on('client/onQuestionRemove', function (data) {
    Vue.delete(app.questions, data.key);
  });

  socket.on('client/onCooldownRemove', function (data) {
    store.setCooldown(false);
  });
};