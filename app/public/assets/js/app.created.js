"use strict";

const created = function () {
  // on - async events

  socket.on('client/onLogin', function (data) {
    app.name = data.name;
    app.picture = "https://graph.facebook.com/" + data.id + "/picture?type=large";
  });

  socket.on('client/onQuestionAdd', function (data) {
    Vue.set(app.questions, data.key, data.question);
  });


  socket.on('client/onQuestionRemove', function (data) {
    Vue.delete(app.questions, data.key);
  });

  // getters

  socket.on('client/getQuestions', function (data) {
    app.questions = data.questions;
  });

  // setters

};