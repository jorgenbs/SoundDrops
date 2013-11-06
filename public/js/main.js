(function() {
  $(document).ready(function() {
    'use strict';
    var canvas, physics, socket;
    socket = io.connect('http://localhost:8080');
    physics = new Physics();
    physics.integrator = new Verlet();
    canvas = Sketch.create({
      container: document.body
    });
    canvas.setup = function() {
      return canvas.fillStyle = '#000000';
    };
    canvas.draw = function() {
      var particle, _i, _len, _ref, _results;
      physics.step();
      _ref = physics.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        particle = _ref[_i];
        canvas.beginPath();
        canvas.arc(particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2);
        _results.push(canvas.fill());
      }
      return _results;
    };
    return window.sd = new SoundDrop('canvas', socket, physics, canvas);
  });

}).call(this);
