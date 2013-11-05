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
    if emit
      @socket.emit 'new_drop',
        widget_code: widget_code

    widget = @_addIframe(widget_code)
    widget_api = SC.Widget(widget[0])
    widget.hide()

    @_addReplacementWidget(widget[0])

  _addIframe: (widget_code) ->
    widget = $(widget_code)
    $(@box).append(widget)
    return widget

  _addReplacementWidget: (widget) ->
    circle = $("<div class='circle'></div>")
    $(@box).append(circle)
    circle.css('position', 'absolute')
    circle.css('left', @_randx(circle))
    circle.jGravity()
    circle.click (e) ->
      e.stopPropagation()
      SC.Widget(widget).toggle()

  _randx: (el) ->
    #random x-position
    box_width = $(@box).width()
    rand_x = Math.random() * (box_width - el.width())
    shift_left = $('body').width() * 0.2

    xpos = Math.floor rand_x + shift_left

    return xpos

this.SoundDrop = SoundDrop