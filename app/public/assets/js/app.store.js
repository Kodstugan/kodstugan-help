"use strict";

let store = {
  state: {
    user: {
      id: null,
      name: '',
      picture: '',
      hasCooldown: false
    },
    notifications: {
      hasActivity: false,
      messages: {}
    },
    questions: {}
  },
  setId(id) {
    this.user.state.id = id
  },
  setName(name) {
    this.user.state.name = name;
  },
  setPicture(picture) {
    this.user.state.picture = picture;
  },
  setCooldown(cooldown) {
    this.user.state.cooldown = cooldown;
  },
  setQuestions(questions) {
    this.user.state.questions = questions
  },
  setActivity(activity) {
    this.user.state.notifications.activity = activity;
  }
};