'use strict'
class SoundDrop
  constructor: (@box, @socket) ->
    if @box? and @socket?
      $(@box).click =>
        widget_code = window.prompt 'pase widget code'
        @add widget_code, true

      @socket.on 'new_drop', (data) =>
        @add data.widget_code, false

  add: (widget_code, emit) ->
    widget = @_addToDOM(widget_code)
    
    
    $(@box).jGravity(
      target: '.target:last-child'
    )

    if emit
      @socket.emit 'new_drop',
        widget_code: widget_code

  _addToDOM: (widget_code) ->
    widget = $(widget_code)
    widget.attr('width', '350px')
    widget.attr('height', '100px')
    widget.attr('class', 'target')
    widget.css('position', 'absolute')
    widget.css('left', @_randx())
    return $(@box).append(widget)

  _randx: () ->
    #random x-position
    box_width = $(@box).width()
    rand_x = Math.random() * (box_width - 350)
    shift_left = $('body').width() * 0.2

    xpos = Math.floor rand_x + shift_left

    return xpos

this.SoundDrop = SoundDrop