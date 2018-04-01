"use strict";

let store = {
  state: {
    user: {
      id: null,
      name: '',
      picture: '',
      hasCooldown: false
    },
    questions: {}
  },
  setId(id) {
    this.state.user.id = id
  },
  setName(name) {
    this.state.user.name = name;
  },
  setPicture(picture) {
    this.state.user.picture = picture;
  },
  setCooldown(cooldown) {
    this.state.user.hasCooldown = cooldown;
  },
  setQuestions(questions) {
    this.state.questions = questions
  },
};