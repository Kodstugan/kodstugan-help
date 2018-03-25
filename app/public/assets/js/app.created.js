"use strict";

const created = function () {
  // on

  socket.on('client/onLogin', function (data) {
    app.name = data.name;
    app.picture = "https://graph.facebook.com/" + data.id + "/picture?type=large";
    app.questions = data.questions;
  });

  socket.on('client/onQuestionAdd', function (data) {
    Vue.set(app.questions, data.key, data.question);
  });


  socket.on('client/onQuestionRemove', function (data) {
    Vue.delete(app.questions, data.key);
  });

  // setters

  function questionAdd(message) {
    const question = {
      message: message,
      name: app.name,
      picture: app.picture
    };

    socket.emit('client/questionAdd', {question: question});
  }

  function questionRemove(key) {
    socket.emit('client/questionRemove', {key: key});
  }
};