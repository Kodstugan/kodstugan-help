"use strict";

module.exports = function (app, io) {
  // TODO: Use MongoDB as backend.
  let users = {};
  let sockets = {};
  let questions = {};
  let counter = -1;

  /**
   * Start listening on incoming socket connections.
   */
  io.on('connection', function (socket) {
    // Add socket + id on first connection.
    let request = socket.request;
    const id = request.user.id;

    users[id] = {
      id: id,
      name: request.user.displayName,
      hasCooldown: false
    };
    sockets[id] = socket;

    /**
     * client/onLogin
     * Emits user data to logged in socket connection.
     */
    socket.emit('client/onLogin', {
      user: users[id],
      questions: questions,
    });

    /**
     * client/questionAdd
     * Receives new question from socket and emits it to all connected sockets.
     */
    socket.on('client/questionAdd', function (data) {
      const key = getNewKey();
      questions[key] = data.question;

      io.emit('client/onQuestionAdd', {key: key, question: data.question});
    });

    /**
     * client/questionRemove
     * Receives question key from socket to delete and updates all connected sockets.
     */
    socket.on('client/questionRemove', function (data) {
      delete questions[data.key];
      io.emit('client/onQuestionRemove', {key: data.key});
    });

    /**
     * client/commentAdd
     * Receives new comment from socket and emits it to all connected sockets.
     */
    socket.on('client/commentAdd', function (data) {
      const key = data.key;
      let question = questions[key];

      if (question.comments === undefined) {
        question.comments = {};
      }

      question.comments[getNewKey()] = data.comment;

      io.emit('client/onQuestionAdd', {key: key, question: question});
    });

    /**
     * client/commentRemove
     * Receives comment key from socket to delete and updates all connected sockets.
     */
    socket.on('client/commentRemove', function (data) {
      if (questions[data.key].comments !== undefined) {
        const key = data.key;
        let question = questions[key];

        delete question.comments[data.commentKey];
        io.emit('client/onQuestionAdd', {key: key, question: question});
      }
    });

    /**
     * client/cooldownAdd
     * Receives user id to add cooldown to.
     */
    socket.on('client/cooldownAdd', function (data) {
      let user = users[data.id];
      user.hasCooldown = true;

      setTimeout(function () {
        user.hasCooldown = false;
        socket.emit('client/onCooldownRemove');
      }, 10 * 1000);
    });

    /**
     * client/questionSolved
     * Receives question to mark as solved and updates all connected sockets.
     */
    socket.on('client/questionSolved', function (data) {
      const key = data.key;
      let question = questions[key];

      question.solved = true;
      io.emit('client/onQuestionAdd', {key: key, question: question});
    })
  });

  function getNewKey() {
    return counter++;
  }
};