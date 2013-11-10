'use strict'
class SoundDrop
  constructor: (@box, @socket, @physics, @canvas) ->
    @wander = new Wander()
    @collision = new Collision()
    @center = new Attraction()
    @center.target.x = window.innerWidth/2
    @center.target.y = window.innerHeight/2
    @center.strength = 700
    
    @playAttraction = new Attraction()
    @playRepulsion = new Attraction()
    @playAttraction.setRadius 1200
    @playRepulsion.setRadius 185
    @playAttraction.strength = 0
    @playRepulsion.strength = 0
    
    min = new Vector 0.0, 0.0
    max = new Vector window.innerWidth, window.innerHeight
    
    @edge = new EdgeBounce min, max
    @COLOURS = ['DC0048', 'F14646', '4AE6A9', '7CFF3F', '4EC9D9', 'E4272E']

    @alpha = null

    if @box? and @socket?
      @socket.on 'new_drop', (data) =>
        @add data.widget_code, false

  peakData: () ->
    return @alpha?.sounddrops.sound.peakData
  
  add: (track, emit) ->
    SC.stream track, (sound) =>
      @_addParticle sound

    #@_addReplacementWidget(widget_api)

  playSound: (particle) ->
    if @alpha is particle
      #pause
      @alpha.sounddrops.sound.togglePause()
    else
      #play
      oldAlpha = @alpha
      @alpha = particle

      @alpha.sounddrops.sound.play()

      if oldAlpha?
        #add attraction to prev alpha + pause
        oldAlpha.sounddrops.sound.pause()
        oldAlpha.behaviours.push @playAttraction
        oldAlpha.behaviours.push @playRepulsion

    sound = @alpha.sounddrops.sound
    
    if sound.playState is 0 or sound.paused is true
      @playAttraction.strength = 0.0
      @playRepulsion.strength = 0.0
      @alpha.behaviours = _.without(@alpha.behaviours, @center)
    else
      #TURN UP DA BASS
      @playAttraction.strength = 120.0
      @playRepulsion.strength = -2000.0
      @alpha.behaviours.push @center

    #remove attraction from alpha particle
    @alpha.behaviours = _.without(@alpha.behaviours, [@playAttraction, @playRepulsion])

  step: () ->
    if @alpha? and  @alpha.sounddrops.sound.playState is 1
      @alpha.colour = Random.item @COLOURS
      @playAttraction.target.x = @alpha.pos.x
      @playAttraction.target.y = @alpha.pos.y
      @playRepulsion.target.x = @alpha.pos.x
      @playRepulsion.target.y = @alpha.pos.y

    @physics.step()

  _addParticle: (sound) ->
    particle = new Particle 1
    position = new Vector( random(window.innerWidth), random(window.innerHeight) )
    particle.moveTo position
    particle.setRadius 35
    particle.colour = Random.item @COLOURS
    particle.sounddrops = { sound: sound }

    #register
    @collision.pool.push particle
    #particle.behaviours.push @wander
    particle.behaviours.push @edge
    particle.behaviours.push @playAttraction
    particle.behaviours.push @playRepulsion
    particle.behaviours.push @collision

    @physics.particles.push particle

  _randx: (el) ->
    #random x-position
    box_width = $(@box).width()
    rand_x = Math.random() * (box_width - el.width())
    shift_left = $('body').width() * 0.2

    xpos = Math.floor rand_x + shift_left

    return xpos

this.SoundDrop = SoundDrop