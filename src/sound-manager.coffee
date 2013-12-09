'use strict'
class SoundManager
  constructor: () ->
    @pool = []
    @playing = null

  addSong: (sound, particle) ->
    @pool.push {
      particle: particle
      sound: sound
    }

  findSound: (particle) ->
    return _.first(_.where(@pool, { particle: particle}))

  #returns: previous playing song
  playSound: (particle) ->
    sound = @findSound(particle)?.sound

    if sound is @playing
      sound.togglePause()
    else if sound?
      old = @pauseCurrent()
      sound.play()

      @playing = sound

    return old

  getPlayingParticle: () ->
    return _.first(_.where(@pool, {sound: @playing}))?.particle

  pauseCurrent: () ->
    @playing?.pause()
    return @playing

  isPlaying: () ->
    return @playing?.paused is false and @playing?.playState is 1

return this.SoundManager = SoundManager