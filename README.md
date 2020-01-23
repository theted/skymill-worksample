# Skymill worksample
A simple console-based game. The only rule is to stay within the box!

### Starting
Start the game by supplying commands
```sh
npm start [width] [height] [x] [y]
```

Example
```sh
npm start 4 4 1 1

 +---+---+---+---+
 |   |   |   |   |
 +---+---+---+---+
 |   | X |   |   |
 +---+---+---+---+
 |   |   |   |   |
 +---+---+---+---+
 |   |   |   |   |
 +---+---+---+---+

```

### Starting in dev mode
Dev mode, containing verbose output is also available by
```sh
npm run devstart 5 5 1 1
```

### Game controlls
- **0** - Exit game
- **1** - Move forward
- **2** - Move backward
- **3** - Change direction 90 degrees clockwise
- **4** - Change direction 90 degrees counter-clockwise
