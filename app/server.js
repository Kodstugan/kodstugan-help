'use strict';

const cookie = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const sqlite = require('connect-sqlite3')(session);
const parser = require('body-parser');
const app = express();

const fs = require('fs');
const key = fs.readFileSync('server.key');
const cert = fs.readFileSync('server.crt');
const credentials = {key: key, cert: cert};

const https = require('https').createServer(credentials, app);
const io = require('socket.io')(https);
const path = require('path');
const passport = require('passport');
const facebook = require('passport-facebook').Strategy;
const passport_socket = require("passport.socketio");

require('./config/index.js')(app, express, path, session, parser, passport, facebook, passport_socket, io, sqlite, 443, cookie);
require('./socket/index.js')(app, io);
require('./routes/index.js')(app, path, passport);

https.listen(app.get('port'), function () {
  console.log('running @ localhost:' + app.get('port'));
});
