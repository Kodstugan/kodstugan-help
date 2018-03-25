"use strict";

const methods = {
  countdown: function () {
    let timer = setInterval(function () {
      if (app.misc.cool_down > 0) {
        app.misc.cool_down--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }
};