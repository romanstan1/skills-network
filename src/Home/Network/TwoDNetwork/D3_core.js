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
 // console.log('lastD3Event', lastD3Event)
 if(lastD3Event) {
   context.save();
   context.clearRect(0, 0, width, height);
   context.translate(lastD3Event.x, lastD3Event.y);
   context.scale(lastD3Event.k, lastD3Event.k);
   draw();
   context.restore();

   if(node) node.attr("transform", lastD3Event);
  }
  else draw()
}

let currentConnectedLinks = []
let desiredConnectedLinks = []
let partitionedCurrentLinks = []
let partitionedDesiredLinks = []

export function draw(d, bool) {
  // Urggh...
  context.clearRect(0,0, width, height)
  if(d && bool) dClick = d
  else if (d && !bool) dClick = null
  const currentLinks = links.filter(link => link.type === 'currentSkills' )
  const desiredLinks = links.filter(link => link.type === 'desiredSkills')

  if(d) { // set new links arrays
    currentConnectedLinks = links.filter(link => link.type === 'currentSkills' && (d.id === link.source.id || d.id === link.target.id))
    desiredConnectedLinks = links.filter(link => link.type === 'desiredSkills' && (d.id === link.source.id || d.id === link.target.id))
    partitionedCurrentLinks = currentLinks.filter(link => !currentConnectedLinks.includes(link))
    partitionedDesiredLinks = desiredLinks.filter(link => !desiredConnectedLinks.includes(link))
  }

  const drawLink = (link) => {
    context.moveTo(link.source.x, link.source.y)
    context.lineTo(link.target.x, link.target.y)
  }

  const configureContext = (linkCategory, gapSize, connected) => {
    context.lineWidth = 1
    if(connected) context.strokeStyle = 'rgba(211, 171, 158, 0.8)'
    else context.strokeStyle = 'rgba(53, 58, 68,1)'
    context.beginPath()
    context.setLineDash([10, gapSize])
    linkCategory.forEach(link => drawLink(link))
    context.stroke()
  }

  if(dClick) {
    configureContext(partitionedCurrentLinks, 0, false)
    configureContext(partitionedDesiredLinks, 6, false)
    configureContext(currentConnectedLinks, 0, true)
    configureContext(desiredConnectedLinks, 6, true)
  } else {
    configureContext(currentLinks, 0, true)
    configureContext(desiredLinks, 6, true)
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

  context = d3.select('canvas')
  .node()
  .getContext('2d')

  const zoom = d3.zoom().scaleExtent([0.2 , 20.0]).on("zoom", zoomed);
  const transform = d3.zoomIdentity.translate((width / 2.8), (height / 2.8)).scale(0.3);
  // const transform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.2);

  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom)
    .call(zoom.transform, transform)

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

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
  zoomed()
}
