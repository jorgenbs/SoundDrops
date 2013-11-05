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
      var widget, widget_api;
      if (emit) {
        this.socket.emit('new_drop', {
          widget_code: widget_code
        });
      }
      widget = this._addIframe(widget_code);
      widget_api = SC.Widget(widget[0]);
      widget.hide();
      return this._addReplacementWidget(widget[0]);
    };

    SoundDrop.prototype._addIframe = function(widget_code) {
      var widget;
      widget = $(widget_code);
      $(this.box).append(widget);
      return widget;
    };

    SoundDrop.prototype._addReplacementWidget = function(widget) {
      var circle;
      circle = $("<div class='circle'></div>");
      $(this.box).append(circle);
      circle.css('position', 'absolute');
      circle.css('left', this._randx(circle));
      circle.jGravity();
      return circle.click(function(e) {
        e.stopPropagation();
        return SC.Widget(widget).toggle();
      });
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
