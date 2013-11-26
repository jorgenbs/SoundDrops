(function() {
  'use strict';
  var SoundDrop;

  SoundDrop = (function() {
    function SoundDrop(box, socket, physics) {
      var max, min,
        _this = this;
      this.box = box;
      this.socket = socket;
      this.physics = physics;
      this.wander = new Wander();
      this.collision = new Collision();
      this.center = new Attraction();
      this.center.target.x = window.innerWidth / 2;
      this.center.target.y = window.innerHeight / 2;
      this.center.strength = 2000;
      this.playAttraction = new Attraction();
      this.playRepulsion = new Attraction();
      this.playAttraction.setRadius(1200);
      this.playRepulsion.setRadius(185);
      this.playAttraction.strength = 0;
      this.playRepulsion.strength = 0;
      min = new Vector(0.0, 0.0);
      max = new Vector(window.innerWidth, window.innerHeight);
      this.edge = new EdgeBounce(min, max);
      this.COLOURS = ['DC0048', 'F14646', '4AE6A9', '7CFF3F', '4EC9D9', 'E4272E'];
      this.SoundManager = new SoundManager();
      if ((this.box != null) && (this.socket != null)) {
        this.socket.on('new_drop', function(data) {
          return _this.add(data.widget_code, false);
        });
      }
    }

    SoundDrop.prototype.peakData = function() {
      var _ref;
      return (_ref = this.SoundManager.playing) != null ? _ref.peakData : void 0;
    };

    SoundDrop.prototype.add = function(track, emit) {
      var _this = this;
      return SC.stream(track, function(sound) {
        return _this._addParticle(sound);
      });
    };

    SoundDrop.prototype.playSound = function(particle) {
      var current, oldSound, _ref;
      oldSound = (_ref = this.SoundManager.playSound(particle)) != null ? _ref.particle : void 0;
      if (oldSound != null) {
        oldSound.behaviours.push(this.playAttraction);
        oldSound.behaviours.push(this.playRepulsion);
      }
      if (this.SoundManager.isPlaying()) {
        current = this.SoundManager.getPlayingParticle();
        current.behaviours = _.without(current.behaviours, [this.playAttraction, this.playRepulsion]);
      }
      return this._setFieldStrengths();
    };

    SoundDrop.prototype.step = function() {
      var playing;
      if (this.SoundManager.isPlaying()) {
        playing = this.SoundManager.getPlayingParticle();
        playing.colour = Random.item(this.COLOURS);
        this.playAttraction.target.x = playing.pos.x;
        this.playAttraction.target.y = playing.pos.y;
        this.playRepulsion.target.x = playing.pos.x;
        this.playRepulsion.target.y = playing.pos.y;
      }
      return this.physics.step();
    };

    SoundDrop.prototype._setFieldStrengths = function() {
      var particle, _ref;
      if (this.SoundManager.isPlaying()) {
        this.playAttraction.strength = 0.0;
        this.playRepulsion.strength = 0.0;
        return (_ref = this.SoundManager.getPlayingParticle()) != null ? _ref.behaviours.push(this.center) : void 0;
      } else {
        this.playAttraction.strength = 120.0;
        this.playRepulsion.strength = -2000.0;
        particle = this.SoundManager.getPlayingParticle();
        return particle != null ? particle.behaviours = _.without(particle.behaviours, this.center) : void 0;
      }
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
      this.collision.pool.push(particle);
      particle.behaviours.push(this.edge);
      particle.behaviours.push(this.playAttraction);
      particle.behaviours.push(this.playRepulsion);
      particle.behaviours.push(this.collision);
      this.physics.particles.push(particle);
      return this.SoundManager.addSong(sound, particle);
    };

    SoundDrop.prototype._getParticle = function(id) {
      return _.first(_.where(physics.particles, {
        id: id
      })) != null;
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

(function() {
  'use strict';
  var SoundManager;

  SoundManager = (function() {
    function SoundManager() {
      this.pool = [];
      this.playing = null;
    }

    SoundManager.prototype.addSong = function(sound, particle) {
      return this.pool.push({
        particle: particle,
        sound: sound
      });
    };

    SoundManager.prototype.findSound = function(particle) {
      return _.first(_.where(this.pool, {
        particle: particle
      }));
    };

    SoundManager.prototype.playSound = function(particle) {
      var old, sound, _ref;
      sound = (_ref = this.findSound(particle)) != null ? _ref.sound : void 0;
      if (sound === this.playing) {
        sound.togglePause();
      } else if (sound != null) {
        old = this.pauseCurrent();
        sound.play();
        this.playing = sound;
      }
      return old;
    };

    SoundManager.prototype.getPlayingParticle = function() {
      var _ref;
      return (_ref = _.first(_.where(this.pool, {
        sound: this.playing
      }))) != null ? _ref.particle : void 0;
    };

    SoundManager.prototype.pauseCurrent = function() {
      var _ref;
      if ((_ref = this.playing) != null) {
        _ref.pause();
      }
      return this.playing;
    };

    SoundManager.prototype.isPlaying = function() {
      var _ref, _ref1;
      return ((_ref = this.playing) != null ? _ref.paused : void 0) === false && ((_ref1 = this.playing) != null ? _ref1.playState : void 0) === 1;
    };

    return SoundManager;

  })();

  return this.SoundManager = SoundManager;

}).call(this);
