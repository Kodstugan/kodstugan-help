const computed = {
  characters: function () {
    // `this` points to the vm instance
    return this.question.message.length;
  }
};