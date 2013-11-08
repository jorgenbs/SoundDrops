$(document).ready () =>
  'use strict'
  socket = io.connect('http://localhost:8080')
  SC.initialize
    client_id: '740f6d636f1113f90f3b442344099312'

  physics = new Physics()
  physics.integrator = new Verlet()
  canvas = Sketch.create {container: document.body }

  this.SD = new SoundDrop 'canvas', socket, physics, canvas

  canvas.mouseup = () =>
    m = new Vector canvas.mouse.x, canvas.mouse.y
    delta = new Vector()

    for p in physics.particles
      (delta.copy m).sub p.pos
      r = p.radius
      # Check if particles collide.
      SD.playSound(p) if abs(delta.x) <= r and abs(delta.y) <= r

  canvas.draw = () ->
    SD.step()

    for particle in physics.particles
      canvas.beginPath()
      canvas.fillStyle = particle.colour
      canvas.arc( particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2 )
      canvas.fill()