import * as THREE from 'three'

let unvisited, stack, currentTile, tiles, sideLength
const getTile = (x, y, direction) => {
  switch (direction) {
    case 'top':
      return tiles.find((c) => c.x === x && c.y === y + sideLength);
    
    case 'right':
      return tiles.find((c) => c.x === x + sideLength && c.y === y);

    case 'left':
      return tiles.find((c) => c.x === x - sideLength && c.y === y)

    case 'bottom':
      return tiles.find((c) => c.x === x && c.y === y - sideLength)

    default:
      return null

  }
}

const getOpposite = (direction) => {
  switch (direction) {
    case 'top':
      return 'bottom'

    case 'left':
      return 'right'

    case 'right':
      return 'left'

    case 'bottom':
      return 'top'
  }
}

const initialize = (newTiles, newSideLength) => {
  tiles = newTiles
  sideLength = newSideLength
  unvisited = []
  stack = []
  tiles.forEach((c) => {
    unvisited.push(c)
  })
  currentTile = tiles[0]
  currentTile.state = 1
}

const generate = (scene) => {
  if (unvisited.length > 0) {
    let options = ['top', 'left', 'bottom', 'right']
    let neighborTile = null;
    while (options.length !== 0 && neighborTile === null) {
      const index = Math.floor(Math.random() * options.length);
      const direction = options[index];
      options = options.filter((o) => o !== direction);

      neighborTile = getTile(currentTile.x, currentTile.y, direction);
      if (neighborTile !== undefined && !(neighborTile.state === 1 || neighborTile.state === 2)) {
        stack.push(currentTile)
        scene.remove(currentTile[direction])
        currentTile[direction] = null
        scene.remove(neighborTile[getOpposite(direction)])
        neighborTile[getOpposite(direction)] = null
        neighborTile.state = 1
        currentTile = neighborTile
      } else {
        neighborTile = null
      }

      if (options.length === 0) {
        break;
      }
    }
    if (neighborTile === null) {
      currentTile.state = 2
      currentTile = stack.pop()
    }
    unvisited = unvisited.filter((c) => !(c.state === 1 || c.state === 2))
  }
}

const isFinished = () => unvisited.length === 0

export default { initialize, generate, isFinished }

