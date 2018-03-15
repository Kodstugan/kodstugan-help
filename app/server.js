'use strict';

const cookie = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const sqlite = require('connect-sqlite3')(session);
const parser = require('body-parser');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const passport = require('passport');
const facebook = require('passport-facebook').Strategy;
const passport_socket = require("passport.socketio");

require('./config/index.js')(app, express, path, session, parser, passport, facebook, passport_socket, io, sqlite, 1337, cookie);
require('./socket/index.js')(app, io);
require('./routes/index.js')(app, path, passport);

http.listen(app.get('port'), function () {
  console.log('running @ localhost:' + app.get('port'));
});
