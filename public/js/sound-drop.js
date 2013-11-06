(function() {
  'use strict';
  var SoundDrop;

  SoundDrop = (function() {
    function SoundDrop(box, socket, physics, canvas) {
      var max, min,
        _this = this;
      this.box = box;
      this.socket = socket;
      this.physics = physics;
      this.canvas = canvas;
      this.wander = new Wander();
      this.collision = new Collision();
      min = new Vector(0.0, 0.0);
      max = new Vector(window.innerWidth, window.innerHeight);
      this.edge = new EdgeBounce(min, max);
      if ((this.box != null) && (this.socket != null)) {
        this.socket.on('new_drop', function(data) {
          return _this.add(data.widget_code, false);
        });
      }
      canvas.mouseup = function() {
        var delta, m, p, r, _i, _len, _ref, _results;
        m = new Vector(canvas.mouse.x, canvas.mouse.y);
        delta = new Vector();
        _ref = physics.particles;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          (delta.copy(m)).sub(p.pos);
          r = p.radius;
          if (abs(delta.x) <= r && abs(delta.y) <= r) {
            _results.push(_this.playSound(p));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
    }

    SoundDrop.prototype.add = function(widget_code, emit) {
      var widget, widget_api;
      widget_code = "<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/118763851\"></iframe>";
      if (emit) {
        this.socket.emit('new_drop', {
          widget_code: widget_code
        });
      }
      widget = this._addIframe(widget_code);
      widget_api = SC.Widget(widget[0]);
      widget.hide();
      return this._addReplacementWidget(widget_api);
    };

    SoundDrop.prototype.playSound = function(particle) {
      var sd;
      sd = particle.sounddrop;
      sd.toggle();
      if (!sd.isPaused()) {
        return this._setAlphaParticle(particle);
      }
    };

    SoundDrop.prototype._setAlphaParticle = function(particle) {};

    SoundDrop.prototype._addIframe = function(widget_code) {
      var widget;
      widget = $(widget_code);
      $(this.box).append(widget);
      return widget;
    };

    SoundDrop.prototype._addReplacementWidget = function(widget_api) {
      var particle, position;
      particle = new Particle(Math.random());
      position = new Vector(random(this.width), random(this.height));
      particle.moveTo(position);
      particle.setRadius(50);
      particle.sounddrop = widget_api;
      particle.behaviours.push(this.wander);
      particle.behaviours.push(this.edge);
      return this.physics.particles.push(particle);
    };

    SoundDrop.prototype._randx = function(el) {
      var box_width, rand_x, shift_left, xpos;
      box_width = $(this.box).width();
      rand_x = Math.random() * (box_width - el.width());
      shift_left = $('body').width() * 0.2;
      xpos = Math.floor(rand_x + shift_left);
      return xpos;
    };

    return SoundDrop;

  })();

  this.SoundDrop = SoundDrop;

}).call(this);
