"use strict";

module.exports = function (app, io) {
  let users = {};
  let questions = {};
  let counter = -1;

  /**
   * Start listening on incoming socket connections.
   * @param socket
   */
  io.on('connection', function (socket) {
    // Add socket + id on first connection.
    const id = socket.request.user.id;
    users[id] = {socket: socket};

    /**
     * client/onLogin
     * Emits user data to logged in socket connection.
     */
    socket.emit('client/onLogin', {
      user: users[id],
      questions: questions,
    });

    socket.on('client/questionAdd', function (data) {
      const key = counterNext();

      questions[key] = data.question;
      io.emit('client/onQuestionAdd', {key: key, question: data.question});

      setTimeout(function () {
        delete questions[key];
        io.emit('client/onQuestionRemove', {key: key});
      }, 24 * 60 * 60 * 1000);
    });

    socket.on('client/questionRemove', function (data) {
      delete questions[data.key];
      io.emit('client/onQuestionRemove', {key: data.key});
    });

    socket.on('client/commentAdd', function (data) {
      if (questions[data.key].comments === undefined) {
        questions[data.key].comments = {};
        questions[data.key].comments[counterNext()] = data.comment;
      } else {
        questions[data.key].comments[counterNext()] = data.comment;
      }

      io.emit('client/onQuestionAdd', {key: data.key, question: questions[data.key]});
    });

    socket.on('client/commentRemove', function (data) {
      if (questions[data.key].comments !== undefined) {
        delete questions[data.key].comments[data.ckey];
        io.emit('client/onQuestionAdd', {key: data.key, question: questions[data.key]});
      }
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
      }, 10 * 1000);
    });

    socket.on('client/questionSolved', function (data) {
      questions[data.key].solved = true;
      io.emit('client/onQuestionAdd', {key: data.key, question: questions[data.key]});
    })
  });

  function counterNext() {
    counter++;
    return counter;
  }

  function hasCooldown(id) {
    return !(cooldowns.find(x => x.id === id) === undefined);
  }
};