express = require 'express'
path = require 'path'
http = require 'http'
jade = require 'jade'
app = express()

app.set 'view engine', 'jade'
app.set 'views', __dirname + '/public/views'
app.use(express.static(path.join __dirname, 'public' ))
app.use app.router
app.use express.logger('dev')
app.use express.favicon()

app.get '/', (req, res) ->
  res.render('index')

server = http.createServer app
server.listen '8080', () ->
  console.log 'server running'