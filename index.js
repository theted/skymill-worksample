const readline = require('readline')
const Game = require('./game.js')

/**
 * Main wrapper function
 */
const main = () => {
  const [width, height, x, y] = process.argv.splice(2)
  const game = new Game({ width, height, x, y })
  setupEvents(game)
  game.start()
}

/**
 * Bind game events
 * TODO: maybe move to Game class?
 * @param {Game} game 
 * @param {stdin} stdin Input stream 
 */
const setupEvents = (game, stdin = process.stdin) => {
  stdin.resume()
  stdin.setEncoding('utf8')

  readline.emitKeypressEvents(stdin)
  stdin.setRawMode(true)

  stdin.on('keypress', (str, key) => {
    game.move(str)

    // handle process termination 
    if (key && key.ctrl && key.name == 'c') process.exit()
  })

  // process.stdin.pipe(process.stdout)
}

main()
