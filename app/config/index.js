"use strict";

module.exports = function (app, express, path, session, parser, passport, facebook, passport_socket, io, sqlite, port, cookie) {
  app.use(express.static(path.join(__dirname, '../public/')));
  app.use('/vue', express.static(path.join(__dirname, '../node_modules/vue/dist/')));
  app.use('/vue-router', express.static(path.join(__dirname, '../node_modules/vue-router/dist/')));

  let store = new sqlite();

  const credentials = require('../credentials');

  app.use(session({
    key: 'express.sid',
    store: store,
    secret: credentials.session.secret,
    resave: true,
    saveUninitialized: true
  }));

  app.use(parser.urlencoded({extended: false}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new facebook({
      clientID: credentials.facebook.clientId,
      clientSecret: credentials.facebook.clientSecret,
      callbackURL: credentials.facebook.callbackUrl
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  function onAuthorizeSuccess(data, accept) {
    accept(null, true);
  }

  function onAuthorizeFail(data, message, error, accept) {
    if (error)
      throw new Error(message);

    accept(null, false);
  }

  io.use(passport_socket.authorize({
    cookieParser: cookie,
    key: 'express.sid',
    secret: credentials.session.secret,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  }));

  app.set('port', (process.env.PORT || port));
};