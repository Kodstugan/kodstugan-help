"use strict";

const created = function () {
  socket.on('client/update-info', function (data) {
    app.name = data.name;
    app.picture = "https://graph.facebook.com/" + data.id + "/picture?type=large";
  });
};