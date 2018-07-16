import * as d3 from "d3"
import {peopleColour, skillsColour, connectionsColour} from 'styles/theme'
import {
  nodeSize,
  dashLine,
  clicked,
  dragstarted,
  dragged,
  dragended,
  chargeStrength,
  nodeColor,
  linkColor,
  mouseout,
  mouseover
} from './D3_modules'

let node,
  lastD3Event,
  simulation,
  context,
  globallinks,
  links,
  nodes,
  width,
  height,
  dClick


function zoomed() {
  if(d3.event) { // last zoom event saved to variable
    lastD3Event = d3.event.transform
  }
 if(lastD3Event) {
   context.save();
   context.clearRect(0, 0, width, height);
   context.translate(lastD3Event.x, lastD3Event.y);
   context.scale(lastD3Event.k, lastD3Event.k);
   draw();
   context.restore();
   node.attr("transform", lastD3Event);
 }
 else draw()
}


let currentConnectedLinks = []
let desiredConnectedLinks = []
let newCurrentLinks = []
let newDesiredLinks = []

export function draw(d, bool) {

  if(d && bool) {
    dClick = d
  } else if (d && !bool) {
    dClick = null
  } 

  context.clearRect(0,0, width, height)
  // console.log('d', d)


  // let currentConnectedLinks = []
  // let desiredConnectedLinks = []
  // let newCurrentLinks = []
  // let newDesiredLinks = []

  const currentLinks = links.filter(link => link.type === 'currentSkills' )
  const desiredLinks = links.filter(link => link.type === 'desiredSkills')

  if(d) { // set new links arrays
    console.log('links', links)
    currentConnectedLinks = links.filter(link =>
      link.type === 'currentSkills' && (d.id === link.source.id || d.id === link.target.id)
    )
    desiredConnectedLinks = links.filter(link =>
      link.type === 'desiredSkills' && (d.id === link.source.id || d.id === link.target.id)
    )
    // console.log('currentConnectedLinks', currentConnectedLinks)
    // console.log('desiredConnectedLinks', desiredConnectedLinks)

    newCurrentLinks = currentLinks.filter(link => !currentConnectedLinks.includes(link))
    newDesiredLinks = desiredLinks.filter(link => !desiredConnectedLinks.includes(link))

    // console.log('currentLinks', currentLinks)
    // console.log('newCurrentLinks', newCurrentLinks)
    // console.log('newDesiredLinks', newDesiredLinks)
  }





  // if clicked all non connected and desired links are grey
  // full redraw on click

  const drawLink = (link) => {
    context.moveTo(link.source.x, link.source.y)
    context.lineTo(link.target.x, link.target.y)
  }

  const configureContext = (linkCategory, gapSize) => {
    context.lineWidth = 1
    context.strokeStyle = 'rgba(211, 171, 158, 0.8)'
    context.beginPath()
    context.setLineDash([10, gapSize])
    linkCategory.forEach(link => drawLink(link))
    context.stroke()
  }

  const configureConnectedContext = (linkCategory, gapSize, connected) => {
    context.lineWidth = 1
    if(connected) context.strokeStyle = 'rgba(211, 171, 158, 0.8)'
    else context.strokeStyle = 'rgba(53, 58, 68,1)'
    context.beginPath()
    context.setLineDash([10, gapSize])
    linkCategory.forEach(link => drawLink(link))
    context.stroke()
  }

  // configureContext(currentLinks, 0, d, false)
  // configureContext(desiredLinks, 6, d, false)

  if(dClick) {

    configureConnectedContext(newCurrentLinks, 0, false)
    configureConnectedContext(newDesiredLinks, 6, false)

    configureConnectedContext(currentConnectedLinks, 0, true)
    configureConnectedContext(desiredConnectedLinks, 6, true)
  } else {
    configureContext(currentLinks, 0)
    configureContext(desiredLinks, 6)

    // configureConnectedContext(currentLinks, 0, false)
    // configureConnectedContext(desiredLinks, 6, false)
  }
}

function ticked() {
  zoomed()
  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
}

export function render2(incomingnodes, incominglinks, incomingwidth, incomingheight) {

  nodes = incomingnodes
  links = incominglinks
  width = incomingwidth
  height = incomingheight

  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom()
      .scaleExtent([0.3 , 20.0])
      .on("zoom", zoomed)
    )
  context = d3.select('canvas')
    .node()
    .getContext('2d')

  const forceX = d3.forceX(width / 2).strength(0.030)
  const forceY = d3.forceY(height / 2).strength(0.030)

  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d.id).strength(0.01))
    .force("charge", d3.forceManyBody().strength(chargeStrength))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', forceX)
    .force('y',  forceY)

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
    .on("tick", ticked)
    .force("link")
    .links(links)
}

export function update2(incomingnodes, incominglinks, incomingwidth, incomingheight) {

  nodes = incomingnodes
  links = incominglinks
  width = incomingwidth
  height = incomingheight

  node = node.data(nodes)
  node.exit().remove()
  node = node.enter().append("circle")
    .merge(node)
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
    .attr("data-node", (d) => d.id)
    .attr("stroke-width", '0px')
    .attr("stroke", '#fff')
    .on("click",(d) => clicked(d, nodes, links))
    .on("mouseover", (d) => mouseover(d, width))
    .on("mouseout", mouseout)
    .call(d3.drag()
      .on("start", d => dragstarted(d, simulation))
      .on("drag", dragged)
      .on("end",d => dragended(d, simulation))
    )

  // console.log('links', links)
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
  zoomed()
}
