"use strict"

module.exports = function (app, express, path, port) {
  app.use(express.static(path.join(__dirname, '../public/')));
  app.use('/vue', express.static(path.join(__dirname, '../node_modules/vue/dist/')));
  app.use('/vue-router', express.static(path.join(__dirname, '../node_modules/vue-router/dist/')));

  app.set('port', (process.env.PORT || port));
};