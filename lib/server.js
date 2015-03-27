var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var Server = function(port) {
  this.port = port;
  this.app = express();
  this.server = http.Server(this.app);
  this.io = socketio(this.server);
};

Server.prototype.start = function() {
  this.server.listen(this.port);

  this.app.use(express.static(__dirname + '/../public'));

  /*
  this.app.get('/blabla', function (req, res) {
    res.sendfile(__dirname + '/../package.json');
  });
  */

  var self = this;
  this.io.on('connection', function (socket) {
    socket.emit('welcome', { data: 'welcome' });
    socket.on('message', function (data) {
      self.io.sockets.emit('message', data);
    });
  });

  console.log('Server do bufo a bombar!');
};


module.exports = Server;
