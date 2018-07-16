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
  height


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

function draw() {
  context.clearRect(0,0, width, height)
  context.lineWidth = 1
  context.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  context.beginPath()
  links.forEach(link => {
    context.moveTo(link.source.x, link.source.y)
    context.lineTo(link.target.x, link.target.y)
  })
  context.stroke()
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
