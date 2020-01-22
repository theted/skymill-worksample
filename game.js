/**
 * Game logic
 */

const log = console.log
const debug = require('debug')('app')
const write = console.log // process.stdout.write
const data = require('./data.js')

const Game = class Game {
  constructor(options) {

    // require required parameters
    if (!options.width || !options.height || !options.x || !options.y) {
      log(data.instructions)
      process.exit()
    }

    debug('Im in the game constructor!', options)

    let { width, height, x, y } = options
    this.directions = ['north', 'east', 'south', 'west']
    this.setupGameArea(width, height, x, y)
  }

  start() {
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
   * Change orientation of the object
   * TODO: implement actual support for multiple steps
   * @param {int} steps  
   */
  changeDirection(steps = 1) {
    this.direction += steps
    if (this.direction > 3) this.direction = 0
    if (this.direction < 0) this.direction = 3
    debug('Direction:', this.directions[this.direction])
  }

  /**
   * Move the object n step(s) according to it'd direction
   * @param {number} [step=1] Number of stes
   */
  forward(step = 1) {
    switch (this.direction) {
      case 0: this.position[0] -= step; break; // north
      case 1: this.position[1] += step; break; // east
      case 2: this.position[0] += step; break; // south
      case 3: this.position[1] -= step; break; // west
    }
  }

  backward() {
    this.forward(-1)
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

  /**
   * Determine if the object is off board. Current implementation is 
   * a simple edge-detection for a rectangle (x*y) shape. This
   * could easily be modified to test for an arbitrary figure,
   * by storing the shape in a matrix of x/y coordinates. 
   */
  isOffBoard() {
    let [x, y] = this.position

    return (
      x < 0 || y < 0 || x > this.height - 1 || y > this.width - 1
    )
  }

  /**
   * Output the current location of the object on the game board
   */
  outputCurrentLocation() {
    let [x, y] = this.position
    console.log('Object is at location:', [x, y])

    if (this.isOffBoard()) {
      console.log('! Fell of the table @', [x, y])
      process.exit(0)
    }

    this.outputGameBoard()
  }

  /**
   * Output a graphical representation of the current board state to
   * stdout. This method could easily be modified to display a
   * figure of arbitrary shape [...]
   */
  outputGameBoard() {
    let out = ''
    let divider = ' +'

    // compute a divider
    for (let y = 0; y < this.width; ++y) { divider += '---+' }

    for (let x = 0; x < this.height; ++x) {
      out += "\n" + divider + "\n"

      for (let i = 0; i < this.width; ++i) {
        out += (this.position[0] === x && this.position[1] === i) ? ' | X' : ' |  '
      }

      out += ' |'
    }

    out += "\n" + divider + "\n"

    debug(out)
  }

}


module.exports = Game
