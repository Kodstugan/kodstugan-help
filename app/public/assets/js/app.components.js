"use strict";

const about_v = Vue.component('about-v', {
  template: '\
  <div class="about-v">\
    <section>\
      <h1>Behöver du hjälp?</h1>\
      <p>\
        Segmentation fault? NullpointerException?\
        <br/>\
        Vi alla har varit där, det kan vara otroligt frustrerande när man väl fastnar i sin kod. Men du kan vara lugn, \
        tillsammans är vi (förhoppningsvis) kloka.\
        <br/>\
        <br/>\
        Nedanför kan du anmäla dig för att få hjälp!\
      </p>\
      <router-link to="/new" class="button gradient">Jag behöver hjälp!</router-link>\
    </section>\
    <section>\
      <h1>Vad är detta?</h1>\
      <p>\
        Du har kommit till Kodstugans hemsida. Vi sitter varje Onsdag i Datavetarnas cafeteria och kodar.\
        Det spelar ingen roll om du är Java master eller nybörjare, alla är välkomna!\
        <br/>\
        <br/>\
        Psst, vi har fika också…\
      </p>\
    </section>\
    <section>\
      <h1>Kontakt</h1>\
      <p>\
        Gilla oss på Facebook så du inte missar våra evenemang och annat kul!\
      </p>\
    </section>\
  </div>'
});

const question_list_v = Vue.component('question-list-v', {
  data: function () {
    return {
      app: {}
    }
  },
  created: function () {
    this.app = this.$router.app;
  },
  template: '\
  <div class="question-list-v gradient">\
    <h1>Hjälplistan</h1>\
    <question-v v-for="(question, key) in app.questions" :question="question" :key="key" :id="key"></question-v>\
  </div>'
});

const question_v = Vue.component('question-v', {
  props: ['question', 'id'],
  template: '\
  <div class="question-v">\
    <div class="left-column">\
      <img :src="question.image_url" alt="">\
    </div>\
    <div class="right-column">\
      <p class="name">{{ question.first_name }} {{ question.last_name }}</p>\
      <p class="message">{{ question.message }}</p>\
      <router-link :to="{ name: \'question\', params: { id: id }}" class="button">Hjälp {{ question.first_name }}</router-link>\
    </div>\
  </div>'
});