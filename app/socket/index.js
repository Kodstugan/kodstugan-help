"use strict";

module.exports = function (app, io) {
  let questions = {};
  let cooldowns = [];
  let counter = -1;

  io.on('connection', function (socket) {
    socket.emit('client/onLogin', {
      id: socket.request.user.id,
      name: socket.request.user.displayName,
      questions: questions,
      canPost: canPost(socket.request.user.id)
    });

    socket.on('client/questionAdd', function (data) {
      const key = counterNext();

      questions[key] = data.question;
      io.emit('client/onQuestionAdd', {key: key, question: data.question});
    });

    socket.on('client/questionRemove', function (data) {
      delete questions[data.key];
      io.emit('client/onQuestionRemove', {key: data.key});
    });

    socket.on('client/cooldownAdd', function (data) {
      let user = {
        id: data.id,
        socket: socket
      };

      cooldowns.push(user);

      setTimeout(function () {
        const index = cooldowns.findIndex(x => x.id === data.id);
        cooldowns.splice(index, 1);
        socket.emit('client/onCooldownRemove');
      }, 60 * 1000);
    })
  });

  function counterNext() {
    counter++;
    return counter;
  }

  function canPost(id) {
    return (cooldowns.find(x => x.id === id) === undefined);
  }
};