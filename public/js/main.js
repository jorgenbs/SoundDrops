(function() {
  $(document).ready(function() {
    var sd, socket;
    socket = io.connect('http://localhost:8080');
    return sd = new SoundDrop('.box', socket);
  });

}).call(this);
