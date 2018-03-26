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
        Du har kommit till Kodstugans hjälplista. Vi sitter varje Onsdag i Datavetarnas cafeteria och kodar.\
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

const me_v = Vue.component('me-v', {
  data: function () {
    return {
      app: {}
    }
  },
  created: function () {
    this.app = this.$router.app;
  },
  template: '\
  <div class="me-v">\
    <h1>{{ app.name }}</h1>\
    <p class="bread">Det här är din profil, nedanför kan du se alla frågor du har ställt.</p>\
    <me-question-v v-for="(question, key) in app.questions" :question="question" :key="key" :id="key" v-if="question.id === app.id"></me-question-v>\
  </div>',
});

Vue.component('me-question-v', {
  data: function () {
    return {
      app: {}
    }
  },
  created: function () {
    this.app = this.$router.app;
  },
  props: ['question', 'id'],
  template: '\
  <div class="question-v">\
    <div class="left-column">\
      <img :src="question.picture" alt="">\
    </div>\
    <div class="right-column">\
      <p class="name">{{ question.name }}</p>\
      <p class="message">{{ question.message }}</p>\
      <a v-if="question.id === app.id" @click="questionRemove" class="button red">Ta bort fråga</a>\
    </div>\
  </div>',
  methods: {
    questionRemove: function () {
      socket.emit('client/questionRemove', {key: this.id});
    }
  }
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
  </div>',
});

Vue.component('question-v', {
  data: function () {
    return {
      app: {}
    }
  },
  created: function () {
    this.app = this.$router.app;
  },
  props: ['question', 'id'],
  template: '\
  <div class="question-v">\
    <div class="left-column">\
      <img :src="question.picture" alt="">\
    </div>\
    <div class="right-column">\
      <p class="name">{{ question.name }}</p>\
      <p class="message">{{ question.message }}</p>\
      <router-link :to="{ name: \'question\', params: { id: id }}" class="button green">Hjälp {{ question.name }}</router-link>\
      <a v-if="question.id === app.id" @click="questionRemove" class="remove"><img src="assets/images/delete.svg"></a>\
    </div>\
  </div>',
  methods: {
    questionRemove: function () {
      socket.emit('client/questionRemove', {key: this.id});
    }
  }
});

const menu_v = Vue.component('menu-v', {
  data: function () {
    return {
      app: {}
    }
  },
  created: function () {
    this.app = this.$router.app;
  },
  template: '\
  <div class="menu-v">\
    <ul>\
      <li><router-link to="/">Start</router-link></li>\
      <li><router-link to="/new">Ställ en fråga</router-link></li>\
      <li><router-link to="/me"><img :src="app.picture" alt=""></router-link></li>\
      <li><router-link to="/me"><p>{{ app.name }}</p></router-link></li>\
    </ul>\
  </div>'
});

const new_v = Vue.component('new-v', {
  data: function () {
    return {
      app: {}
    }
  },
  created: function () {
    this.app = this.$router.app;
  },
  template: '\
  <div class="new-v">\
    <section>\
      <h1>Ställ en fråga</h1>\
      <p>\
        Nedanför kan du ställa en fråga, försök att förklara tydligt vad du har problem med.\
      </p>\
      <textarea v-model="app.question.message" maxlength="100" v-if="!app.misc.disabled"></textarea>\
      <p class="small" v-if="!app.misc.disabled">{{ app.characters }} (20) / 100</p>\
      <p class="message" v-if="app.misc.message.length > 0">{{ app.misc.message }}</p>\
      <a class="button gradient" @click="send" v-if="!app.misc.disabled">Skicka</a>\
      <a class="button gradient" @click="reset" v-if="app.misc.disabled">Ställ en ny fråga</a>\
    </section>\
  </div>',
  methods: {
    send: function () {
      if (app.question.message.length < 20) {
        app.misc.message = 'För kort text.';
      } else if (!app.misc.canPost) {
        app.misc.message = 'Du skickar frågor för ofta, vänta lite.';
      }
      else {
        app.misc.canPost = false;
        app.misc.disabled = true;
        app.misc.message = 'Fråga skickad!';
        this.questionAdd();
      }
    },
    reset: function () {
      app.question.message = '';

      app.misc.message = '';
      app.misc.disabled = false;
    },
    questionAdd: function () {
      const question = {
        id: app.id,
        message: app.question.message,
        name: app.name,
        picture: app.picture
      };

      socket.emit('client/questionAdd', {question: question});
      socket.emit('client/cooldownAdd', {id: app.id});
    }
  }
});