(function() {
  'use strict';
  var SoundDrop;

  SoundDrop = (function() {
    function SoundDrop(box, socket) {
      var _this = this;
      this.box = box;
      this.socket = socket;
      if ((this.box != null) && (this.socket != null)) {
        $(this.box).click(function() {
          var widget_code;
          widget_code = window.prompt('pase widget code');
          return _this.add(widget_code, true);
        });
        this.socket.on('new_drop', function(data) {
          return _this.add(data.widget_code, false);
        });
      }
    }

    SoundDrop.prototype.add = function(widget_code, emit) {
      var widget;
      widget = this._addToDOM(widget_code);
      $(this.box).jGravity({
        target: '.target:last-child'
      });
      if (emit) {
        return this.socket.emit('new_drop', {
          widget_code: widget_code
        });
      }
    };

    SoundDrop.prototype._addToDOM = function(widget_code) {
      var widget;
      widget = $(widget_code);
      widget.attr('width', '350px');
      widget.attr('height', '100px');
      widget.attr('class', 'target');
      widget.css('position', 'absolute');
      widget.css('left', this._randx());
      return $(this.box).append(widget);
    };

    SoundDrop.prototype._randx = function() {
      var box_width, rand_x, shift_left, xpos;
      box_width = $(this.box).width();
      rand_x = Math.random() * (box_width - 350);
      shift_left = $('body').width() * 0.2;
      xpos = Math.floor(rand_x + shift_left);
      return xpos;
    };

    return SoundDrop;

  })();

  this.SoundDrop = SoundDrop;

}).call(this);
