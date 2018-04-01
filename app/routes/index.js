"use strict";

module.exports = function (app, path, passport) {
  app.get('/auth/facebook/success',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/auth/facebook/failure'
    }));

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.all('*', function (req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, '../views/index.html'));
    } else {
      res.redirect('/auth/facebook');
    }
  });
};