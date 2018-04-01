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

    if (store.state.id === data.question.id) {
      let activity = {};
      activity.key = data.key;

      if (data.question.comments === undefined) {
        // question created.
        activity.type = 0;
      } else {
        // new comment on your question.
        activity.type = 1;
      }

      store.state.notifications.push(activity);
      store.setActivity(true);
    }
  });

  socket.on('client/onQuestionRemove', function (data) {
    let activity = {};
    activity.key = data.key;
    activity.type = 2; // question removed.

    store.state.notifications.push(activity);
    store.setActivity(true);

    Vue.delete(app.questions, data.key);
  });

  socket.on('client/onCooldownRemove', function (data) {
    store.setCooldown(false);
  });
};