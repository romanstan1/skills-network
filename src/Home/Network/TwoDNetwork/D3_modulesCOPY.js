import * as d3 from "d3"
import {peopleColour, skillsColour, connectionsColour} from 'styles/theme'
import {clickPerson, clickSkill,closeFullDetails} from 'store/modules/actions'
import store from 'store'
const {dispatch} = store

let node, link, lastD3Event, simulation

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

function zoomed(width, height) {
  if(d3.event) { // last zoom event saved to variable
    lastD3Event = d3.event.transform
  }
  node.attr("transform", lastD3Event);
  link.attr("transform", lastD3Event);
}




export function render2(nodes, links, width, height) {
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom()
      .scaleExtent([0.3 , 20.0])
      .on("zoom", () => zoomed(width, height)))

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
    .on("click",clicked)
    // .on("mouseover", mouseover)
    // .on("mouseout", mouseout)
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

  simulation
    .nodes(nodes)
    .on("tick", ticked)
    .force("link")
    .links(links)

  link
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    .attr("data-type", (d) => d.type)

}



function ticked() {
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

export function update2(nodes, links, width, height) {
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
    .on("click",clicked)
    // .on("mouseover", mouseover)
    // .on("mouseout", mouseout)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();

  zoomed()
}















function clicked(d) {
  console.log('clicked', d)
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
