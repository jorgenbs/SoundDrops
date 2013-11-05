class SoundDrop
  constructor: (@box) ->
    self = this
    $(@box).click ->
      widget_code = window.prompt 'pase widget code'
      self.add(widget_code)

  add: (widget_code) ->
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

this.SoundDrop = SoundDrop