(function() {
  var _this = this;

  $(document).ready(function() {
    'use strict';
    var canvas, physics, socket;
    socket = io.connect('http://localhost:8080');
    SC.initialize({
      client_id: '740f6d636f1113f90f3b442344099312'
    });
    physics = new Physics();
    physics.integrator = new Verlet();
    canvas = Sketch.create({
      container: document.body
    });
    _this.SD = new SoundDrop('canvas', socket, physics, canvas);
    canvas.mouseup = function() {
      var delta, m, p, r, _i, _len, _ref;
      m = new Vector(canvas.mouse.x, canvas.mouse.y);
      delta = new Vector();
      _ref = physics.particles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        (delta.copy(m)).sub(p.pos);
        r = p.radius;
        if (abs(delta.x) <= r && abs(delta.y) <= r) {
          return SD.playSound(p);
        }
      }
    };
    return canvas.draw = function() {
      var particle, _i, _len, _ref, _results;
      SD.step();
      _ref = physics.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        particle = _ref[_i];
        canvas.beginPath();
        canvas.fillStyle = particle.colour;
        canvas.arc(particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2);
        canvas.fillRect(100, 500, 120, 500 * SD.peakData.left);
        _results.push(canvas.fill());
      }
      return _results;
    };
  });

}).call(this);
