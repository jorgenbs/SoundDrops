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
      this.playAttraction = new Attraction();
      this.playRepulsion = new Attraction();
      this.playAttraction.setRadius(1200);
      this.playRepulsion.setRadius(20);
      this.playAttraction.strength = 0;
      this.playRepulsion.strength = 0;
      min = new Vector(0.0, 0.0);
      max = new Vector(window.innerWidth, window.innerHeight);
      this.edge = new EdgeBounce(min, max);
      this.COLOURS = ['DC0048', 'F14646', '4AE6A9', '7CFF3F', '4EC9D9', 'E4272E'];
      if ((this.box != null) && (this.socket != null)) {
        this.socket.on('new_drop', function(data) {
          return _this.add(data.widget_code, false);
        });
      }
    }

    SoundDrop.prototype.add = function(track, emit) {
      var _this = this;
      return SC.stream(track, function(sound) {
        return _this._addParticle(sound);
      });
    };

    SoundDrop.prototype.playSound = function(particle) {
      var oldAlpha;
      if (this.alpha === particle) {
        this.alpha.sounddrops.sound.pause();
        this.playAttraction.strength = 0.0;
        this.playRepulsion.strength = 0.0;
      } else {
        oldAlpha = this.alpha;
        this.alpha = particle;
        this.alpha.sounddrops.sound.play();
        if (oldAlpha != null) {
          oldAlpha.sounddrops.sound.pause();
          oldAlpha.behaviours.push(this.playAttraction);
          oldAlpha.behaviours.push(this.playRepulsion);
        }
        this.playAttraction.strength = 120.0;
        this.playRepulsion.strength = -1000.0;
      }
      return this.alpha.behaviours = _.without(this.alpha.behaviours, [this.playAttraction, this.playRepulsion]);
    };

    SoundDrop.prototype.step = function() {
      if ((this.alpha != null) && this.alpha.sounddrops.sound.playState === 1) {
        this.alpha.colour = Random.item(this.COLOURS);
        this.playAttraction.target.x = this.alpha.pos.x;
        this.playAttraction.target.y = this.alpha.pos.y;
        this.playRepulsion.target.x = this.alpha.pos.x;
        this.playRepulsion.target.y = this.alpha.pos.y;
      }
      return this.physics.step();
    };

    SoundDrop.prototype._addIframe = function(widget_code) {
      var widget;
      widget = $(widget_code);
      $(this.box).append(widget);
      return widget;
    };

    SoundDrop.prototype._addParticle = function(sound) {
      var particle, position;
      particle = new Particle(1);
      position = new Vector(random(window.innerWidth), random(window.innerHeight));
      particle.moveTo(position);
      particle.setRadius(35);
      particle.colour = Random.item(this.COLOURS);
      particle.sounddrops = {
        sound: sound
      };
      particle.behaviours.push(this.edge);
      particle.behaviours.push(this.playAttraction);
      particle.behaviours.push(this.playRepulsion);
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
