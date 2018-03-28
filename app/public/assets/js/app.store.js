"use strict";

let store = {
  state: {
    id: null,
    name: '',
    picture: '',
    cooldown: false,
    questions: {}
  },
  setId(id) {
    this.state.id = id
  },
  setName(name) {
    this.state.name = name;
  },
  setPicture(picture) {
    this.state.picture = picture;
  },
  setQuestions(questions) {
    this.state.questions = questions;
  },
  setCooldown(cooldown) {
    this.state.cooldown = cooldown;
  }
};