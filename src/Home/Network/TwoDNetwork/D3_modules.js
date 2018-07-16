import * as d3 from "d3"
import {peopleColour, skillsColour, connectionsColour} from 'styles/theme'
import {clickPerson, clickSkill,closeFullDetails} from 'store/modules/actions'
import store from 'store'
import {draw} from './D3_core'
const {dispatch} = store

export function dashLine(type) {
  if(type === 'currentSkills') return false
  else if(type === 'desiredSkills') return "4, 10"
  else return false
}

export function nodeSize(d) {
  if(d.type === 'skill') { // checks if its a skill node
    return Math.pow((d.hadBy.length + d.wantedBy.length), 1.1) + 6
  }
  else return 7
}

export function clicked(d, nodes, links) {
  // Urggh ...
  if(d) { // saves a reference to node thats clicked
    var thisNode = d3.select(`[data-node='${d.id}']`)
  }
  
  if(d && d.type === 'person' && !thisNode.classed("selected")) dispatch(clickPerson(d))
  else if(d && d.type === 'skill' && !thisNode.classed("selected")) dispatch(clickSkill(d))

  if(!d) { // if clicked is called from a filter
    d3.selectAll("circle").classed("not-selected", false).classed("connected", false)
    draw(true, false)
    // dispatch(closeFullDetails())
  } else if(thisNode.classed("selected")) { // if the node thats clicked on is reclicked
    thisNode.classed("selected", false)
    d3.selectAll("circle").classed("not-selected", false).classed("connected", false)
    draw(d, false)
    dispatch(closeFullDetails())
  }
  else { // first time clicked on a node
    draw(d, true)
    firstTimeClickOnNode(d, links, thisNode)
  }
}


function firstTimeClickOnNode(d, links, thisNode) {
  const selectNode = node => d3.select(`[data-node='${node}']`).classed("not-selected", false)
  d3.selectAll("circle").classed("selected", false).classed("not-selected", true).classed("connected", false)
  thisNode.classed("not-selected", false).classed("selected", true)
  const showCurrentSkills =  store.getState().data.connections.filters[0].active // true if current skills are active
  const showDesiredSkills =  store.getState().data.connections.filters[1].active // true if desired skills are active

  if(d.type === 'person') { // if node clicked on is person node
    // turn skills nodes on that are connected to the people node
    if(showCurrentSkills) d.currentSkills.forEach(skill => selectNode(skill))
    if(showDesiredSkills) d.desiredSkills.forEach(skill => selectNode(skill))

  } else if (d.type === 'skill') { // if node clicked on is skill node
    // turn people nodes on that are connected to the skill node
    if(showCurrentSkills) d.hadBy.forEach(person => selectNode(person))
    if(showDesiredSkills) d.wantedBy.forEach(person => selectNode(person))
  }
}



export function dragstarted(d, simulation) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

export function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

export function dragended(d, simulation) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

export function chargeStrength(d) {
  if(d.type === 'skill') {
    const char = Math.pow((d.hadBy.length + d.wantedBy.length), 1.7) + 130
    return - char
  } else return -100
}

export function nodeColor(type) {
  if(type === 'person') return peopleColour
  else if(type === 'skill') return skillsColour
  else return '#ff00d0'
}

export function linkColor(type) {
  if(type === 'currentSkills') return '#dce5dc'
  else if(type === 'desiredSkills') return '#49c67b'
  else return connectionsColour
}

export function mouseover(d, width) {
  d3.select(`[data-node='${d.id}']`)
    .attr("stroke-width", '2px')
  const fullDetailsXPosition = document.getElementById('full-details').getBoundingClientRect();
	d3.select("#tooltip")
		.style("right", (width - fullDetailsXPosition.x + 260) + 15 + "px")
		.style("top", "15px")
		.select("#value")
		.text(d.name);
	d3.select("#tooltip").classed("hidden", false);
}

export function mouseout(d) {
  d3.select("#tooltip").classed("hidden", true);
  d3.select(this)
    .attr("stroke-width", 0)
}
