"use strict";

const created = function () {
  /**
   * client/onLogin
   * Receives user platform specific data from server.
   */
  socket.on('client/onLogin', function (data) {
    store.setId(data.user.id);
    store.setName(data.user.name);
    store.setPicture("https://graph.facebook.com/" + data.user.id + "/picture?type=large");
    store.setCooldown(data.user.hasCooldown);
    store.setQuestions(data.questions);
  });

  /**
   * client/onQuestionAdd
   * Receives new question from server.
   */
  socket.on('client/onQuestionAdd', function (data) {
    Vue.set(store.state.questions, data.key, data.question);
  });

  /**
   * client/onQuestionRemove
   * Receives question to delete from server.
   */
  socket.on('client/onQuestionRemove', function (data) {
    Vue.delete(store.state.questions, data.key);
  });

  /**
   * client/onCooldownRemove
   * Receives update from server to remove cooldown.
   */
  socket.on('client/onCooldownRemove', function (data) {
    store.setCooldown(false);
  });
};