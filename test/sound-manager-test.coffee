###
chai = require 'chai'
assert = chai.assert
soundDrops = require '../public/js/sound-drop'

require ['../public/js/underscore.min'], (_) ->
  describe 'SoundManager', () ->
    sd = new soundDrops.SoundManager()
    particle1 = { id: '1' }
    sound1 = { title: 'some title' }

    sd.addSong sound1, particle1

    it 'findSong() should', () ->
      find = sd.findSong particle1
      assert(true, 'find the sound')
###