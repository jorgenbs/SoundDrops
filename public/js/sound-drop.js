(function() {
  var SoundDrop;

  SoundDrop = (function() {
    function SoundDrop(box) {
      var self;
      this.box = box;
      self = this;
      $(this.box).click(function() {
        var widget_code;
        widget_code = window.prompt('pase widget code');
        return self.add(widget_code);
      });
    }

    SoundDrop.prototype.add = function(widget_code) {
      var widget, xpos;
      widget = $(widget_code);
      widget.attr('width', '350px');
      widget.attr('height', '100px');
      widget.attr('class', 'target');
      xpos = Math.floor(Math.random() * $('body').width() - 350);
      widget.css('position', 'absolute');
      widget.css('left', xpos);
      $(this.box).append(widget);
      return $(this.box).jGravity({
        target: '.target:last-child'
      });
    };

    return SoundDrop;

  })();

  this.SoundDrop = SoundDrop;

}).call(this);
