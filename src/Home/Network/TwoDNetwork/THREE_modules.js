import * as THREE from 'three'

// var camera, scene, renderer;
//
// export function init(width, height) {
//   scene = new THREE.Scene()
//   camera = new THREE.PerspectiveCamera(75,width / height,0.1,1000)
//   renderer = new THREE.WebGLRenderer({ antialias: true })
//
//   createLights(scene)
//   scene.add( new THREE.AxesHelper( 1000 ) );
//
//   camera.position.z = 33
//   renderer.setSize(width, height)
//
//   const element = document.getElementById('twod-graph')
//   element.appendChild(renderer.domElement)
//
// }

export function createLights(scene) {
  let light = new THREE.AmbientLight( 0xffffff, 0.5 );
  // var light = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  scene.add( light );

  let spotLight = new THREE.SpotLight( 0xffffff, 1.0 );
  spotLight.position.set( 10, 10, 50 );
  // spotLight.angle = 1;
  // spotLight.penumbra = 0.95;
  // spotLight.distance = 3085;

  // spotLight.castShadow = true;
  // spotLight.shadow.darkness = 0.5;
  // spotLight.shadow.mapSize.width = 1024;
  // spotLight.shadow.mapSize.height = 1024;
  //
  // spotLight.shadow.camera.near = 0.1;
  // spotLight.shadow.camera.far = 2000;
  // spotLight.shadow.camera.fov = 30;
  // spotLight.decay = 0;

  scene.add( spotLight );
}

export class Circle {

  constructor(scene, camera, renderer) {

    // const geometry = new THREE.BoxGeometry(2,2,2)
    // const material = new THREE.MeshPhongMaterial({ color:'#433F81' })
    // const circle = new THREE.Mesh(geometry, material)

    const geometry = new THREE.CircleGeometry( 5, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const circle = new THREE.Mesh( geometry, material );
    // scene.add( circle );

    // const domEvents	= new THREEx.DomEvents(camera, renderer.domElement)
    // domEvents.addEventListener(cube, 'click', (event) => {
  	// 	console.log("cube's userdata index: ", cube.userData.index)
  	// 	console.log("cube's postion: ", cube.position)
  	// 	console.log(" " )
  	// }, false)

    circle.position.set(0, 0, 0)

    scene.add(circle)
    this.mesh = circle
  }
}
