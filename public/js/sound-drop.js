(function() {
  var SoundDrop;

  SoundDrop = (function() {
    function SoundDrop(box) {
      this.box = box;
      $(this.box).jGravity();
    }

    SoundDrop.prototype.add = function(url) {
      var widget;
      widget = $("<iframe width='100%' height='450' scrolling='no' ---\nframeborder='no' src='https://w.soundcloud.com/player/---\n?url='\" + url +\"></iframe>");
      widget.attr('src', widget.attr('src') + url);
      return $(this.box).append(widget);
    };

    return SoundDrop;

  })();

  this.SoundDrop = SoundDrop;

}).call(this);
