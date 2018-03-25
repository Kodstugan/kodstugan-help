"use strict";

module.exports = function (app, io) {
  let questions = {};
  let counter = -1;

  io.on('connection', function (socket) {
    socket.emit('client/onLogin', {
      id: socket.request.user.id,
      name: socket.request.user.displayName,
      questions: questions
    });

    socket.on('client/questionAdd', function (data) {
      const key = counterNext();

      questions[key] = data.question;
      io.emit('client/onQuestionAdd', {key: key, question: data.question});
    });

    socket.on('client/questionRemove', function (data) {
      const index = questions.indexOf(data.key);
      questions.splice(index, 1);

      io.emit('client/onQuestionRemove', {key: data.key});
    });
  });

  function counterNext() {
    counter++;
    return counter;
  }
};