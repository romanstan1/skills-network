import * as d3 from "d3"
import * as THREE from "three"
import {peopleColour, skillsColour, connectionsColour} from 'styles/theme'
import throttle from 'lodash.throttle'

let renderer, scene, camera, simulation
let simNodes, simLinks
let node, link
let lastD3Event


// window.addEventListener('mousewheel', mousewheel);

function mousewheel(e) {
  if(camera.zoom < 0.25 && e.wheelDeltaY > 0 || camera.zoom > 1.8 && e.wheelDeltaY < 0 ) return null
  else camera.zoom -= e.wheelDeltaY * 0.0001;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera)
}


export function render3(width, height) {
  // console.log('RENDER: ', width, height)

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000)
  // camera = new THREE.PerspectiveCamera(0, width, height, 0, 1, 1000)
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'highp',
    alpha: true
  })

  scene.add(new THREE.AxesHelper(1000))
  renderer.setSize(width, height)
  document.getElementById('twod-graph').appendChild(renderer.domElement)
  camera.position.z = 5

  // addrNodes(nodes)
  // addrLinks(links)
  const forceX = d3.forceX(width / 2).strength(0.030)
  const forceY = d3.forceY(height / 2).strength(0.030)

  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d.id).strength(0.01))
    .force("charge", d3.forceManyBody())
    .force("charge", d3.forceManyBody().strength(chargeStrength))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', forceX)
    .force('y',  forceY)

  // runSimulation(nodes, links, width, height)
}

// function runSimulation(nodes, links, width, height) {
//   simulation
//     .nodes(nodes)
//     .on("tick", ()=>ticked(nodes, links))
//     .force("link")
//     .links(links)
// }

function addNode(node) {

  const geometry = new THREE.CircleBufferGeometry(node.type === 'skill'? node.hadBy.length * 2 : 6, 32)
  const material = new THREE.MeshBasicMaterial({ color: node.type === 'person'? 0x08a8a8 : 0x2b23c4 })
  node.circle = new THREE.Mesh(geometry, material)
  scene.add(node.circle)
  // nodes.forEach((node) => {
  //   const geometry = new THREE.CircleBufferGeometry(node.type === 'skill'? node.hadBy.length * 2 : 6, 32)
  //   const material = new THREE.MeshBasicMaterial({ color: node.type === 'person'? 0x08a8a8 : 0x2b23c4 })
  //   node.circle = new THREE.Mesh(geometry, material)
  //   scene.add(node.circle)
  // })

  // TODO:

  // 1. Check if node is in scene via Mesh UUID
  // 2. Add node if not in scene
  // 3. Do nothing if node is already in scene
  // 4. Delete nodes that are in scene that do not have node.

  // Map through both nodes and scene arrays.

  // no need to delete mesh from node because only active nodes will be passed through.
  // Although potentially have to clear mesh UUID's (and d3 values) from non active nodes in the reducer






  // update the reducer to clean out circle, geometry and material from data upon deletion of that data point
  // check if that node has a mesh, circle and geometry ie is in the Scene
  // if it doesn't add them to the object and it to the Scene

  // if it already does, do nothing

  // compare scene mesh ids against the nodes to find out which data nodes have been deleted
  // delete/remove the meshes from the scene that are no longer there
}

function addLink(link) {
  const material = new THREE.LineBasicMaterial({ color: 0xAAAAAA })
  const geometry = new THREE.Geometry()
  link.line = new THREE.Line(geometry, material)
  scene.add(link.line)
  // links.forEach((link) => {
  //   // link.material = new THREE.LineBasicMaterial({ color: 0xAAAAAA })
  //   // link.geometry = new THREE.Geometry()
  // })
}

function ticked(nodes, links) {
  nodes.forEach((node) => {
    const { x, y, circle } = node
    circle.position.set(x, y, 0)
  })

  // links.forEach((link) => {
  //   const { source, target, line } = link
  //   line.geometry.verticesNeedUpdate = true
  //   line.geometry.vertices[0] = new THREE.Vector3(source.x, source.y, -1)
  //   line.geometry.vertices[1] = new THREE.Vector3(target.x, target.y, -1)
  // })

  renderer.render(scene, camera)
}

function chargeStrength(d) {
  if(d.type === 'skill') {
    const char = Math.pow((d.hadBy.length + d.wantedBy.length), 1.7) + 130
    return - char
  } else return -100
}




let firstUpdate = true
export function update3(nodes, links) {


  // map nodes and links onto local variables.
  // enter update and exit them onto the newnodes, these nodes can be precisely what is rendered onto the Scene
  // enter update and exit them from Scene


  console.log("","","UPDATED Nodes: ", nodes,"", "UPDATED Links: ", links,"")


  simNodes = nodes





  // TODO:

  // Look at mesh object to compare nodes and links in the Scene
  // Map through the scene, compare nodes and add and remove ones that have changed.
  // Essentially manually create D3's enter, update, exit pattern.
  // Does d3 have a virtual memory of what should on the dom? Can that be used instead of manually doing it?
  // Create the force links
  // Restart animation



  // map through data, check if in scene and then add or remove or do nothing to that datum


  // simulation.nodes(nodes);
  // simulation.force("link").links(links);
  // simulation.alpha(1).restart();

  // console.log('scene children 1: ', scene.children)

  nodes.forEach(node => {
    // console.log('node.circle: ', node.circle)
    if(!node.circle) addNode(node) // if node not in scene it wont have a circle property
  })
  // links.forEach(link => {
  //   if(!link.line) addLink(link)
  // })

  // remove mesh from scene if the mesh is not contained within the node array.

  scene.children.forEach(childMesh => {
    const removalNode = nodes.find(node => node.circle.uuid === childMesh.uuid)
    // const removalLink = links.find(link => link.line.uuid === childMesh.uuid)
    if(!removalNode) {
      console.log('This to be removed!: ', removalNode, childMesh)
      scene.remove(childMesh)
    }
  })

  // console.log('Anything to be removed?: ', !removalNode && !removalLink)
    // console.log('childMesh: ', childMesh)


  if(firstUpdate) {



    simulation
      .nodes(nodes)
      .on("tick", ()=>ticked(nodes, links))
      .force("link").links(links)

    // console.log('scene: ', scene)

    // console.log('scene children 2: ', scene.children)
    // console.log('scene children 2: ', scene.children.forEach())

    firstUpdate = false
  } else {
    // console.log('scene children 3: ', scene.children)
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
  }
}











function chargeStrength(d) {
  if(d.type === 'skill') {
    const char = Math.pow((d.hadBy.length + d.wantedBy.length), 1.7) + 130
    return - char
  } else return -100
}

function nodeColor(type) {
  if(type === 'person') return peopleColour
  else if(type === 'skill') return skillsColour
  else return '#ff00d0'
}

function linkColor(type) {
  if(type === 'currentSkills') return '#dce5dc'
  else if(type === 'desiredSkills') return '#49c67b'
  else return connectionsColour
}


function zoomed() {
  if(d3.event) { // last zoom event saved to variable
    lastD3Event = d3.event.transform
  }

  node.attr("transform", lastD3Event);
  link.attr("transform", lastD3Event);
}

export function render2(nodes, links, width, height) {
  // width = width - 260
  // const height = window.innerHeight
  console.log("NODES AND LINKS",nodes, links)

  const svg = d3.select("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom()
      .scaleExtent([0.7 , 20.0])
      .on("zoom", zoomed))

  const forceX = d3.forceX(width / 2).strength(0.030)
  const forceY = d3.forceY(height / 2).strength(0.030)

  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d.id).strength(0.01))
    .force("charge", d3.forceManyBody().strength(chargeStrength))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', forceX)
    .force('y',  forceY)

  link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", (d) => linkColor())
    .attr("stroke-dasharray", (d) => dashLine(d.type))
    .attr("stroke-width", (d) => 2)

  node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
    .attr("data-node", (d) => d.id)
    // .on("click",clicked)
    // .on("mouseover", mouseover)
    // .on("mouseout", mouseout)
    // .call(d3.drag()
    // .on("start", dragstarted)
    // .on("drag", dragged)
    // .on("end", dragended));

  simulation
    .nodes(nodes)
    .on("tick", (x,y)=>ticked(node, link))
    .force("link")
    .links(links)

  link
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    .attr("data-type", (d) => d.type)
}

function ticked(node, link) {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
}

function dashLine(type) {
  if(type === 'currentSkills') return false
  else if(type === 'desiredSkills') return "4, 10"
  else return false
}

function nodeSize(d) {
  if(d.type === 'skill') { // checks if its a skill node
    return Math.pow((d.hadBy.length + d.wantedBy.length), 1.1) + 6
  }
  else return 7
}

export function update2(nodes, links) {
  link = link.data(links)
  link.exit().remove()
  link = link.enter().append("line")
    .merge(link)
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    .attr("data-type", (d) => d.type)
    .attr("stroke", (d) => linkColor())
    .attr("stroke-dasharray", (d) => dashLine(d.type))
    .attr("stroke-width", (d) => 2);

  node = node.data(nodes)
  node.exit().remove()
  node = node.enter().append("circle")
    .merge(node)
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
    .attr("data-node", (d) => d.id)
    // .on("click",clicked)
    // .on("mouseover", mouseover)
    // .on("mouseout", mouseout)
    // .call(d3.drag()
    // .on("start", dragstarted)
    // .on("drag", dragged)
    // .on("end", dragended));

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}
