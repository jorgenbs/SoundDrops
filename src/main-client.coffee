$(document).ready () ->
  socket = io.connect('http://localhost:8080')
  sd = new SoundDrop '.box', socket