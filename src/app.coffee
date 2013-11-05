express = require 'express'
path = require 'path'
http = require 'http'
jade = require 'jade'
socket = require 'socket.io'
app = express()

app.set 'view engine', 'jade'
app.set 'views', __dirname + '/public/views'
app.use(express.static(path.join __dirname, 'public' ))
app.use app.router
app.use express.logger('dev')
app.use express.favicon()
room = '/'

#index
app.get '*', (req, res) ->
  room = req.url
  res.render('index')

#setup http server
server = http.createServer app
server.listen '8080', () ->
  console.log 'server running'

#setup websocket
io = socket.listen server

io.sockets.on 'connection', (socket) ->
  socket.join room
  console.log 'JOINED ' + room
  socket.on 'new_drop', (data) ->
    socket.broadcast.to(room).emit 'new_drop', data