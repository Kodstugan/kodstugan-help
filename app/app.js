'use strict';

const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./routes/index.js')(app);
require('./config/index.js')(app);
require('./socket/index.js')(app);

const server = http.listen(app.get('port'), function () {
  console.log('running @ localhost:' + app.get('port'));
});
