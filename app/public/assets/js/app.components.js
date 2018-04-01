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
      shared: store.state
    }
  },
  template: '\
  <div class="me-v">\
    <h1>{{ shared.name }}</h1>\
    <p class="bread">Det här är din profil, nedanför kan du se alla frågor du har ställt.</p>\
    <me-question-v v-for="(question, key) in shared.questions" :question="question" :key="key" :id="key" v-if="question.id === shared.id"></me-question-v>\
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
      <router-link :to="{ name: \'question\', params: { id: id }}" class="button green">Läs mer</router-link>\
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
    <question-v v-for="(question, key) in app.questions" :question="question" :key="key" :id="key" v-if="!question.solved"></question-v>\
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
      <router-link :to="{ name: \'question\', params: { id: id }}" class="button green">Läs mer</router-link>\
      <router-link :to="{ name: \'question\', params: { id: id }}" class="button purple">{{ question.comments === undefined ? 0 : Object.keys(question.comments).length }}</router-link>\
      <a v-if="question.id === app.id" @click="questionRemove" class="remove"><img src="assets/images/delete.svg"></a>\
    </div>\
  </div>',
  methods: {
    questionRemove: function () {
      socket.emit('client/questionRemove', {key: this.id});
    }
  }
});

const question_full_v = Vue.component('question-full-v', {
  props: ['id'],
  data: function () {
    return {
      message: '',
      warning: '',
      shared: store.state
    }
  },
  template: '\
  <div class="question-full-v gradient">\
    <h1>Fråga #{{ id }}</h1>\
    <template v-if="shared.questions[id] !== undefined">\
      <img :src="shared.questions[id].picture">\
      <p class="name">{{ shared.questions[id].name }}</p>\
      <p class="message">{{ shared.questions[id].message }}</p>\
      <p class="tag">#{{ shared.questions[id].category }}</p>\
      <a class="button green" v-if="!shared.questions[id].solved && shared.questions[id].id === shared.id" @click="markSolved">Markera som löst</a>\
      <p class="button border" v-if="shared.questions[id].solved">Denna fråga har markerats som löst.</p>\
      <ul class="comments" v-if="shared.questions[id].comments !== undefined">\
      <li v-for="(comment, key) in shared.questions[id].comments">\
        <span><span v-if="comment.id === shared.questions[id].id">👑</span> {{ comment.name }}</span>: {{ comment.message }} <a v-if="comment.id === shared.id"\
        @click="commentRemove(key)" class="remove"><img src="/assets/images/delete.svg"></a>\
      </li>\
      </ul>\
      <div class="comment-area" v-if="!shared.questions[id].solved">\
        <img :src="shared.picture">\
        <textarea class="comment" maxlength="200" placeholder="Skriv en kommentar" v-model="message" @keydown.enter.exact.prevent\
        @keyup.enter.exact="send"></textarea>\
        <a class="button green" @click="send">Skicka</a>\
      </div>\
      <p class="warning" v-if="warning.length > 0">{{ warning }}</p>\
    </template>\
  </div>',
  methods: {
    send: function () {
      if (this.message.length < 10) {
        this.warning = 'För kort text.';
      } else if (this.shared.cooldown) {
        this.warning = 'Du skickar kommentarer för ofta, vänta lite.';
      }
      else {
        store.setCooldown(true);
        this.warning = '';
        this.commentAdd();
        this.message = '';
      }
    },
    commentAdd: function () {
      const comment = {
        id: this.shared.id,
        name: this.shared.name,
        picture: this.shared.picture,
        message: this.message,
      };

      socket.emit('client/commentAdd', {key: this.id, comment: comment});
      socket.emit('client/cooldownAdd', {id: this.shared.id});
    },
    commentRemove: function (ckey) {
      socket.emit('client/commentRemove', {key: this.id, ckey: ckey})
    },
    markSolved: function () {
      socket.emit('client/questionSolved', {key: this.id})
    }
  }
});

const menu_v = Vue.component('menu-v', {
  data: function () {
    return {
      shared: store.state
    }
  },
  template: '\
  <div class="menu-v">\
    <ul>\
      <li><router-link to="/">Start</router-link></li>\
      <li><router-link to="/new">Ställ en fråga</router-link></li>\
      <li><router-link to="/me"><img :src="shared.picture" alt=""></router-link><router-link to="/activity" v-if="shared.activity" class="activity green"></router-link></li>\
      <li><router-link to="/me"><p>{{ shared.name }}</p></router-link></li>\
    </ul>\
  </div>'
});

const new_v = Vue.component('new-v', {
  data: function () {
    return {
      shared: store.state,
      disabled: false,
      message: '',
      warning: '',
      category: ''
    }
  },
  template: '\
  <div class="new-v">\
    <section>\
      <h1>Ställ en fråga</h1>\
      <p>\
        Nedanför kan du ställa en fråga, försök att förklara tydligt vad du har problem med.\
      </p>\
      <textarea v-model="message" maxlength="100" v-if="!disabled"></textarea>\
      <select v-model="category" v-if="!disabled">\
        <option value="" selected disabled>Välj kategori</option>\
        <option value="c">C</option>\
        <option value="java">Java</option>\
        <option value="haskell">Haskell</option>\
        <option value="erlang">Erlang</option>\
        <option value="c++">C++</option>\
        <option value="other">Annat</option>\
      </select>\
      <p class="warning" v-if="warning.length > 0">{{ warning }}</p>\
      <a class="button gradient" @click="send" v-if="!disabled">Skicka</a>\
      <a class="button gradient" @click="reset" v-if="disabled">Ställ en ny fråga</a>\
    </section>\
  </div>',
  methods: {
    send: function () {
      if (this.message.length < 20) {
        this.warning = 'För kort text.';
      } else if (this.category.length === 0) {
        this.warning = 'Du måste välja en kategori.'
      } else if (this.shared.cooldown) {
        this.warning = 'Du skickar frågor för ofta, vänta lite.';
      }
      else {
        store.setCooldown(true);
        this.disabled = true;
        this.warning = '';
        this.questionAdd();
      }
    },
    reset: function () {
      this.message = '';
      this.warning = '';
      this.disabled = false;
    },
    questionAdd: function () {
      const question = {
        id: this.shared.id,
        message: this.message,
        name: this.shared.name,
        picture: this.shared.picture,
        category: this.category,
        solved: false
      };

      socket.emit('client/questionAdd', {question: question});
      socket.emit('client/cooldownAdd', {id: this.shared.id});
    }
  }
});