/**
 * Game logic
 */

const log = console.log
const debug = require('debug')('app')
const write = console.log // process.stdout.write
const data = require('./data.js')

const Game = class Game {
  constructor(options) {
    log('Im in the game constructor!', options)
    let { width, height, x, y } = options
    this.directions = ['north', 'east', 'south', 'west']
    this.setupGameArea(width, height, x, y)
  }

  start() {
    log('Starting game!')
    log(data.controls)
    this.outputGameBoard()
  }

  setupGameArea(width, height, x, y) {
    this.width = width
    this.height = height
    this.position = [parseInt(x), parseInt(y)]
    this.direction = 0 // north
  }

  /**
   * Change orientation
   * TODO: implement actual support for multiple steps
   * @param {int} steps  
   */
  changeDirection(steps = 1) {
    this.direction += steps
    if (this.direction > 3) this.direction = 0
    if (this.direction < 0) this.direction = 3
    debug('Direction:', this.directions[this.direction])
  }

  forward() {
    switch (this.direction) {
      case 0: this.position[0] -= 1; break; // north
      case 1: this.position[1] += 1; break; // east
      case 2: this.position[0] += 1; break; // south
      case 3: this.position[1] -= 1; break; // west
    }
  }

  // TODO: fix this ugly logic!
  backward() {
    this.changeDirection()
    this.changeDirection()
    this.forward()
    this.changeDirection()
    this.changeDirection()
  }

  exit() {
    log('Exit simulation')
    this.outputCurrentLocation()
    process.exit(0)
  }

  move(data) {
    switch (parseInt(data)) {
      default: debug('Unknown command:', data); break;
      case 0: this.exit(); break;
      case 1: this.forward(); break;
      case 2: this.backward(); break;
      case 3: this.changeDirection(); break;
      case 4: this.changeDirection(-1); break;
    }

    // output location after move
    this.outputCurrentLocation()
  }

  isOffBoard() {
    let [x, y] = this.position

    return (
      x < 0 || y < 0 || x > this.height - 1 || y > this.width - 1
    )
  }

  outputCurrentLocation() {
    let [x, y] = this.position
    console.log('Object is at location:', [x, y])

    if (this.isOffBoard()) {
      console.log('! Fell of the table @', [x, y])
      process.exit(0)
    }

    this.outputGameBoard()
  }

  outputGameBoard() {
    let out = ''
    let divider = ' +'

    for (let y = 0; y < this.width; ++y) { divider += '---+' }

    for (let x = 0; x < this.height; ++x) {
      out += "\n" + divider + "\n"

      for (let i = 0; i < this.width; ++i) {
        out += (this.position[0] === x && this.position[1] === i) ? ' | X' : ' |  '
      }

      out += ' |'
    }

    out += "\n" + divider + "\n"

    write(out)
  }

}


module.exports = Game
