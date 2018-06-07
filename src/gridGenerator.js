import * as THREE from 'three'
import shortid from 'shortid'

const generateGrid = (scene, sideLength) => {
  const tiles = []
  for (let x = 0; x <= 160; x += sideLength) {
    for (let y = 0; y <= 140; y += sideLength) {
      tiles.push({ id: shortid.generate(), x, y, state: 0, visited: false });
    }
  }
  
  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
  tiles.forEach((tile) => {
    const { x, y } = tile;
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push(new THREE.Vector3(x, y, 0));
    geometry1.vertices.push(new THREE.Vector3(x + sideLength, y, 0));
  
    var geometry2 = new THREE.Geometry()
    geometry2.vertices.push(new THREE.Vector3(x + sideLength, y, 0));
    geometry2.vertices.push(new THREE.Vector3(x + sideLength, y + sideLength, 0));
  
    var geometry3 = new THREE.Geometry()
    geometry3.vertices.push(new THREE.Vector3(x + sideLength, y + sideLength, 0));
    geometry3.vertices.push(new THREE.Vector3(x, y + sideLength, 0));
  
    var geometry4 = new THREE.Geometry()
    geometry4.vertices.push(new THREE.Vector3(x, y + sideLength, 0));
    geometry4.vertices.push(new THREE.Vector3(x, y, 0));
  
    var line1 = new THREE.Line(geometry1, material);
    var line2 = new THREE.Line(geometry2, material);
    var line3 = new THREE.Line(geometry3, material);
    var line4 = new THREE.Line(geometry4, material);
  
    tile['top'] = line3;
    tile['right'] = line2;
    tile['bottom'] = line1;
    tile['left'] = line4;
  
    scene.add(line1)
    scene.add(line2)
    scene.add(line3)
    scene.add(line4)
  });

  return tiles;
}

export default { generateGrid }
