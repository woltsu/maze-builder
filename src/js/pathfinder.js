import * as THREE from 'three'

let tiles, coloredTiles, startingTile, endingTile, sideLength, scene
let closedSet, openSet, cameFrom, gScore, fScore
let finished

const heuristicCostEstimate = (tile1, tile2) => {
  return (Math.abs(tile1.x - tile2.x) + Math.abs(tile1.y - tile2.y)) / sideLength
}

const initialize = (newTiles, newSideLength, newScene) => {
  scene = newScene
  tiles = newTiles
  sideLength = newSideLength
  coloredTiles = []
  
  startingTile = tiles[0]
  endingTile = tiles[tiles.length - 1]

  closedSet = []
  openSet = [ startingTile ]
  cameFrom = {}
  gScore = {}
  fScore = {}
  finished = false

  tiles.forEach((tile) => {
    gScore[tile.id] = 999999
    fScore[tile.id] = 999999
  })

  gScore[startingTile.id] = 0
  fScore[startingTile.id] = heuristicCostEstimate(startingTile, endingTile)

  colorTile(scene, startingTile, 0x00ff00)
  colorTile(scene, endingTile, 0xff0000)
}

const colorTile = (scene, tile, color, customSize) => {
  if (!tile) {
    return
  }
  if (tile.coloredTile) {
    scene.remove(tile.coloredTile)
  }
  
  const { x, y } = tile
  const size = customSize ? customSize : sideLength - 2
  var geometry = new THREE.BoxGeometry(size, size, 0 )
  geometry.translate(x + Math.floor(sideLength / 2), y + Math.floor(sideLength / 2), -1)
  var material2 = new THREE.MeshBasicMaterial( { color } )
  var coloredTile = new THREE.Mesh( geometry, material2 )
  tile.coloredTile = coloredTile
  scene.add( coloredTile )
  coloredTiles.push(coloredTile)
}

const getTileWithLowestFScore = () => {
  let lowest = 999999;
  let id = null;
  openSet.forEach((tile) => {
    if (lowest >= fScore[tile.id]) {
      lowest = fScore[tile.id]
      id = tile.id
    }
  });

  return id
}

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

const getTileById = (tileId) => tiles.find((tile) => tile.id === tileId)
const getNeighbors = (tile) => {
  let directions = []
  let neighbors = []
  if (!tile.top) {
    directions.push('top')
  }

  if (!tile.left) {
    directions.push('left')
  }

  if (!tile.right) {
    directions.push('right')
  }

  if (!tile.bottom) {
    directions.push('bottom')
  }

  directions.forEach((direction) => {
    neighbors.push(getTile(tile.x, tile.y, direction))
  })
  
  return neighbors
}

let totalPath;
const reconstructPath = (currentId) => {
  totalPath = []
  totalPath.push(getTileById(currentId))
  let current = currentId
  while (Object.keys(cameFrom).find((tileId) => tileId === current)) {
    current = cameFrom[current]
    totalPath.push(getTileById(current))
  }
}

const colorFinalPath = () => {
  totalPath.forEach((tile) => {
    if (tile.id === startingTile.id || tile.id === endingTile.id) {
      return
    }
    colorTile(scene, tile, 0x00ff00, sideLength / 5)
  })
}

const findPath = () => {
  if (openSet.length > 0) {
    const currentTileId = getTileWithLowestFScore()
    if (currentTileId === endingTile.id) {
      reconstructPath(currentTileId)
      finished = true
    }
    const currentTile = getTileById(currentTileId)
    if (currentTile !== startingTile && currentTile !== endingTile) {
      colorTile(scene, currentTile, 0xffffff, sideLength / 5)
    }
    currentTile.visited = true
    openSet = openSet.filter((tile) => tile.id !== currentTileId)

    closedSet.push(currentTileId)

    const neighbors = getNeighbors(currentTile)
    neighbors.forEach((neighbor) => {
      if (neighbor.visited) {
        return
      }
      if (closedSet.includes(neighbor)) {
        return
      }

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor)
      }

      const tentativeScore = gScore[currentTileId] + 1
      if (tentativeScore > gScore[neighbor.id]) {
        return
      }

      cameFrom[neighbor.id] = currentTileId
      gScore[neighbor.id] = tentativeScore
      fScore[neighbor.id] = gScore[neighbor.id] + heuristicCostEstimate(neighbor, endingTile)
    })
  }

}

const removeWhitePath = () => {
  tiles.forEach((tile) => {
    if (tile.id === startingTile.id || tile.id === endingTile.id) {
      return
    }
    scene.remove(tile.coloredTile)
  })
}

const isFinished = () => finished

const getColoredTiles = () => coloredTiles

export default { initialize, findPath, isFinished, getColoredTiles, colorFinalPath, removeWhitePath }
