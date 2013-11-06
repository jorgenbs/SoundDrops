$(document).ready () ->
  'use strict'
  socket = io.connect('http://localhost:8080')
  
  physics = new Physics()
  physics.integrator = new Verlet()

  canvas = Sketch.create {container: document.body }

  canvas.setup = () ->
    canvas.fillStyle = '#000000'

  canvas.draw = () ->
    physics.step()

    for particle in physics.particles
      canvas.beginPath()

      canvas.arc( particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2 )
      canvas.fill()

  window.sd = new SoundDrop 'canvas', socket, physics, canvas