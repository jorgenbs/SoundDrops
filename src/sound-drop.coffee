'use strict'
class SoundDrop
  constructor: (@box, @socket, @physics, @canvas) ->
    @wander = new Wander()
    @collision = new Collision()
    min = new Vector 0.0, 0.0
    max = new Vector window.innerWidth, window.innerHeight
    @edge = new EdgeBounce min, max

    if @box? and @socket?
      @socket.on 'new_drop', (data) =>
        @add data.widget_code, false

    canvas.mouseup = () =>
      m = new Vector canvas.mouse.x, canvas.mouse.y
      delta = new Vector()

      for p in physics.particles
        (delta.copy m).sub p.pos
        r = p.radius
        # Check if particles collide.
        @playSound(p) if abs(delta.x) <= r and abs(delta.y) <= r

  add: (widget_code, emit) ->
    widget_code = """<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/118763851"></iframe>"""
    if emit
      @socket.emit 'new_drop',
        widget_code: widget_code

    widget = @_addIframe(widget_code)
    widget_api = SC.Widget(widget[0])
    widget.hide()

    @_addReplacementWidget(widget_api)

  playSound: (particle) ->
    sd = particle.sounddrop
    sd.toggle()

    @_setAlphaParticle particle if not sd.isPaused()

  _setAlphaParticle: (particle) ->
    #do fun stuff

  _addIframe: (widget_code) ->
    widget = $(widget_code)
    $(@box).append(widget)
    return widget

  _addReplacementWidget: (widget_api) ->
    particle = new Particle Math.random()
    position = new Vector( random(this.width), random(this.height) )
    particle.moveTo position
    particle.setRadius 50
    particle.sounddrop = widget_api

    #register
    particle.behaviours.push @wander
    particle.behaviours.push @edge
    @physics.particles.push particle

  _randx: (el) ->
    #random x-position
    box_width = $(@box).width()
    rand_x = Math.random() * (box_width - el.width())
    shift_left = $('body').width() * 0.2

    xpos = Math.floor rand_x + shift_left

    return xpos

this.SoundDrop = SoundDrop