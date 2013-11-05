(function() {
  var app, express, http, io, jade, path, server, socket;

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

  app.get('/', function(req, res) {
    return res.render('index');
  });

  server = http.createServer(app);

  server.listen('8080', function() {
    return console.log('server running');
  });

  io = socket.listen(80);

  io.sockets.on('connection', function(socket) {
    return socket.emit('news', {
      hello: 'world'
    });
  });

}).call(this);
