import * as d3 from "d3"
import {peopleColour, skillsColour, connectionsColour} from 'styles/theme'

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

export function clicked(d) {
  console.log('clicked', d)
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
