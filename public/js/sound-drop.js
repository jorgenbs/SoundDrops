(function() {
  var SoundDrop;

  SoundDrop = (function() {
    function SoundDrop(box, socket) {
      var self;
      this.box = box;
      this.socket = socket;
      self = this;
      $(this.box).click(function() {
        var widget_code;
        widget_code = window.prompt('pase widget code');
        return self.add(widget_code, true);
      });
      this.socket.on('new_drop', function(data) {
        return self.add(data.widget_code, false);
      });
    }

    SoundDrop.prototype.add = function(widget_code, emit) {
      var widget, xpos;
      widget = $(widget_code);
      widget.attr('width', '350px');
      widget.attr('height', '100px');
      widget.attr('class', 'target');
      xpos = Math.floor(Math.random() * $('body').width() - 350);
      widget.css('position', 'absolute');
      widget.css('left', xpos);
      $(this.box).append(widget);
      $(this.box).jGravity({
        target: '.target:last-child'
      });
      if (emit) {
        return this.socket.emit('new_drop', {
          widget_code: widget_code
        });
      }
    };

    return SoundDrop;

  })();

  this.SoundDrop = SoundDrop;

}).call(this);
