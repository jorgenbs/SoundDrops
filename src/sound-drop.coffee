'use strict'
class SoundDrop
  constructor: (@box, @socket, @physics) ->
    @wander = new Wander()
    @collision = new Collision()
    @center = new Attraction()
    @center.target.x = window.innerWidth/2
    @center.target.y = window.innerHeight/2
    @center.strength = 2000
    
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

    @SoundManager = new SoundManager()

    if @box? and @socket?
      @socket.on 'new_drop', (data) =>
        @add data.widget_code, false

  peakData: () ->
    return @SoundManager.playing?.peakData
  
  add: (track, emit) ->
    SC.stream track, (sound) =>
      @_addParticle sound

    #@_addReplacementWidget(widget_api)

  playSound: (particle) ->
    oldSound = @SoundManager.playSound(particle)?.particle
    
    if oldSound?
      oldSound.behaviours.push @playAttraction
      oldSound.behaviours.push @playRepulsion
    
    if @SoundManager.isPlaying()
      current = @SoundManager.getPlayingParticle()
      current.behaviours = _.without(current.behaviours, [@playAttraction, @playRepulsion])

    @_setFieldStrengths()

  step: () ->
    if @SoundManager.isPlaying()
      playing = @SoundManager.getPlayingParticle()
      playing.colour = Random.item @COLOURS
      @playAttraction.target.x = playing.pos.x
      @playAttraction.target.y = playing.pos.y
      @playRepulsion.target.x = playing.pos.x
      @playRepulsion.target.y = playing.pos.y

    @physics.step()

  _setFieldStrengths: () ->
    if @SoundManager.isPlaying()
      #set state to idle
      @playAttraction.strength = 0.0
      @playRepulsion.strength = 0.0
      @SoundManager.getPlayingParticle()?.behaviours.push @center
    else
      @playAttraction.strength = 120.0
      @playRepulsion.strength = -2000.0
      particle = @SoundManager.getPlayingParticle()
      particle?.behaviours = _.without(particle.behaviours, @center)

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
    @SoundManager.addSong sound, particle

  _getParticle: (id) ->
    return _.first( _.where(physics.particles, {id: id}) )?

  _randx: (el) ->
    #random x-position
    box_width = $(@box).width()
    rand_x = Math.random() * (box_width - el.width())
    shift_left = $('body').width() * 0.2

    xpos = Math.floor rand_x + shift_left

    return xpos

this.SoundDrop = SoundDrop