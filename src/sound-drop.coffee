class SoundDrop
  constructor: (@box) ->
    $(@box).jGravity()

  add: (url) ->
    widget = $("""
      <iframe width='100%' height='450' scrolling='no' ---
      frameborder='no' src='https://w.soundcloud.com/player/---
      ?url='" + url +"></iframe>
      """)
    widget.attr('src', widget.attr('src') + url)

    $(@box).append(widget)

this.SoundDrop = SoundDrop