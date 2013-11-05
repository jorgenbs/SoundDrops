class SoundDrop
  constructor: (@box, @socket) ->

    $(@box).click =>
      widget_code = window.prompt 'pase widget code'
      @add widget_code, true

    @socket.on 'new_drop', (data) =>
      @add data.widget_code, false

  add: (widget_code, emit) ->
    widget = $(widget_code)
    widget.attr('width', '350px')
    widget.attr('height', '100px')
    widget.attr('class', 'target')

    #random x-position
    xpos = Math.floor Math.random() * $('body').width() - 350
    widget.css('position', 'absolute')
    widget.css('left', xpos)

    $(@box).append(widget)
    $(@box).jGravity(
      target: '.target:last-child'
    )

    if emit
      @socket.emit 'new_drop',
        widget_code: widget_code

this.SoundDrop = SoundDrop