(function() {
  var app, express, http, io, jade, path, room, server, socket;

  express = require('express');

  path = require('path');

  http = require('http');

  jade = require('jade');

  socket = require('socket.io');

  app = express();

  app.set('view engine', 'jade');

  app.set('views', __dirname + '/public/views');

  app.use(express["static"](path.join(__dirname, 'public')));

  app.use(app.router);

  app.use(express.logger('dev'));

  app.use(express.favicon());

  room = '/';

  app.get('*', function(req, res) {
    room = req.url;
    return res.render('index');
  });

  server = http.createServer(app);

  server.listen('8080', function() {
    return console.log('server running');
  });

  io = socket.listen(server);

  io.sockets.on('connection', function(socket) {
    socket.join(room);
    console.log('JOINED ' + room);
    return socket.on('new_drop', function(data) {
      return socket.broadcast.to(room).emit('new_drop', data);
    });
  });

}).call(this);
