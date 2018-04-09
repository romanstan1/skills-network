import * as d3 from 'd3'
import * as THREE from 'three'

export default class Graphics {
  constructor({canvas,config,initialSize}){
    this.canvas = canvas
    this.initWebGl(canvas)
    this.setDefaultSize(initialSize)
  }
  initWebGl(canvas){
    const context = canvas.getContext('webgl')
    const renderer = new THREE.WebGLRenderer({canvas,context})
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1,-1,0,1000)
    camera.name = "camera"
    scene.add(camera)
    camera.position.z = 100
    // ---
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    // ---
    this.enableThreeJsInspector(scene)
  }
  setDefaultSize({width,height}){
    const {camera} = this
    camera.left =  -width/2
    camera.right = width/2
    camera.top = height/2
    camera.bottom = -height/2
    camera.updateProjectionMatrix()
    console.log("Default camera left", camera.left, "top", camera.top, "right", camera.right, "bottom", camera.bottom);
  }
  setSize({width,height}){
    d3.select(this.canvas)
      .attr("width",width)
      .attr("height",height)
    this.renderer.setSize(width,height)
  }
  render(){
    const {renderer,camera,scene} = this
    renderer.render(scene,camera)
  }
  worldPosition(percent){
    const camera = this.camera
    return {
      x: camera.left + percent.x * (camera.right - camera.left),
      y: camera.top + percent.y * (camera.bottom - camera.top)
    }
  }
  // ---
  enableThreeJsInspector(scene){
    window.scene = scene
    window.THREE = THREE
  }
}
