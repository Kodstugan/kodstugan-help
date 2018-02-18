"use strict";

const about_v = Vue.component('about-v', {
  template: '\
  <div class="about-v">\
    <section>\
      <h1>Behöver du hjälp?</h1>\
      <p>\
        Segmentation fault? NullpointerException?\
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

const help_list_v = Vue.component('help-list-v', {
  template: '\
  <div class="help-list-v gradient"></div>'
});