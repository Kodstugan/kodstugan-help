'use strict';

const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

require('./routes/index.js')(app, path);
require('./config/index.js')(app, express, path, 1337);
require('./socket/index.js')(app, io);

http.listen(app.get('port'), function () {
  console.log('running @ localhost:' + app.get('port'));
});
