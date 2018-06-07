import * as THREE from 'three'
import gridGenerator from './gridGenerator'
import mazeGenerator from './mazeGenerator'
import pathfinder from './pathfinder'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )
camera.position.set( 85, 75, 100 )

let fps, fpsInterval, startTime, now, then, elapsed
fps = 60
fpsInterval = 1000 / fps
then = Date.now()

const sideLength = 10;

let tiles
let isInitialized = false;
let pathfinderInitialized = false;
function animate() {
  requestAnimationFrame( animate )
  renderer.render( scene, camera )
  now = Date.now()
  elapsed = now - then
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    if (!isInitialized) {
      tiles = gridGenerator.generateGrid(scene, sideLength)
      mazeGenerator.initialize(tiles, sideLength)
      isInitialized = true
    } else {
      if (!mazeGenerator.isFinished()) {
        mazeGenerator.generate(scene)
      } else {
        if (!pathfinderInitialized) {
          pathfinder.initialize(tiles, sideLength, scene)
          pathfinderInitialized = true;
        }
        if (!pathfinder.isFinished()) {
          pathfinder.findPath()
        } else {
          pathfinder.getColoredTiles().forEach((coloredTile) => {
            scene.remove(coloredTile)
          })

          tiles.forEach((tile) => {
            scene.remove(tile.top)
            scene.remove(tile.right)
            scene.remove(tile.bottom)
            scene.remove(tile.left)
          })
          isInitialized = false
          pathfinderInitialized = false
        }
      }

    }
  }
}

animate()
