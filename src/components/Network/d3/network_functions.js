import * as d3 from "d3";
import store from '../../../store'
import {peopleColour, skillsColour, connectionsColour} from '../../../styles/theme'
import {clickPerson, clickSkill,closeFullDetails} from '../../../store/modules/actions'
import './network_modules'

let width, height, svg, simulation, link, node
let originalNodes, originalLinks
let workingNodes, workingLinks
let lastD3Event
const {dispatch} = store
let people, skills

console.log("INIT HERE")
export function initializeDom() {
  // construct nodesArray
  people = store.getState().data.people
  skills = store.getState().data.skills

  const skillsNodes = skills.map((skill) => {
    return {
      ...skill,
      personCount: 20,
      peopleCurrent:[],
      peopleDesired:[]
    }
  })
  const nodesArray = [].concat(people, skillsNodes)

  // construct linksArray
  let linksArray = []
  people.forEach((person, ind) => {
    person.currentSkills.forEach((skill, i) => {
      linksArray.push({"source": person.id, "target": skill, "type": "currentSkills"})
      skillsNodes.filter(skillNode => skillNode.id === skill)[0].peopleCurrent.push(person.name)
    })
    person.desiredSkills.forEach((skill, i) => {
      linksArray.push({"source": person.id, "target": skill, "type": "desiredSkills"})
      skillsNodes.filter(skillNode => skillNode.id === skill)[0].peopleDesired.push(person.name)
    })
  })

  originalNodes = nodesArray
  originalLinks = linksArray

  workingNodes = nodesArray
  workingLinks = linksArray
  render()
}

export function reset(){
  svg.selectAll("*").remove();
  width = null
  height  = null
  svg  = null
  simulation  = null
  link = null
  node = null
  render()
}

function chargeStrength(d) {
  if(d.type === 'skill') {
    const char = Math.pow((d.peopleCurrent.length + d.peopleDesired.length), 1.7) + 130
    return - char
  } else return -100
}

function render() {
  width = window.innerWidth - 260
  height = window.innerHeight

  svg = d3.select("svg")
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
    .data(workingLinks)
    .enter().append("line")
    .attr("stroke", (d) => linkColor())
    .attr("stroke-dasharray", (d) => dashLine(d.type))
    .attr("stroke-width", (d) => 2)

  node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(workingNodes)
    .enter().append("circle")
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
    .attr("data-node", (d) => d.id)
    .on("click",clicked)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

  simulation
    .nodes(workingNodes)
    .on("tick", ticked)
    .force("link")
    .links(workingLinks)

  link
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    // .attr("data-type", (d) => d.type)
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

function dashLine(type) {
  if(type === 'currentSkills') return false
  else if(type === 'desiredSkills') return "4, 10"
  else return false
}

function nodeSize(d) {
  if(d.personCount) { // effectively checks if its a skill node
    return Math.pow((d.peopleCurrent.length + d.peopleDesired.length), 1.1) + 6
  }
  else return 7
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

function clicked(d) {

  if(d && d.type === 'person') dispatch(clickPerson(d))
  else if(d && d.type === 'skill') dispatch(clickSkill(d))

  if(d) {
    var thisNode = d3.select(`[data-node='${d.id}']`)
  }

  if(!d) { // if clicked is called from a filter

    d3.selectAll("circle").classed("not-selected", false).classed("connected", false)
    d3.selectAll("line").classed("not-selected", false).classed("connected", false)

    dispatch(closeFullDetails())

  } else if(thisNode.classed("selected")) { // if the node thats clicked on is reclicked
    thisNode.classed("selected", false)
    d3.selectAll("circle").classed("not-selected", false).classed("connected", false)
    d3.selectAll("line").classed("not-selected", false).classed("connected", false)

    dispatch(closeFullDetails())
  }
  else { // first time click on a node
    d3.selectAll("circle").classed("selected", false).classed("not-selected", true).classed("connected", false)
    d3.selectAll("line").classed("not-selected", true).classed("connected", false)
    thisNode.classed("not-selected", false).classed("selected", true)

    const {allFilters} = store.getState().data

    const linkFilters = allFilters
      .filter(parent => parent.parentName === 'connections')[0].filters
      .filter(connections => connections.active)
      .map(connections => connections.name) // get array of active connection types


    if(d.type === 'person') { // if node clicked on is person node

      d3.selectAll(`[data-source='${d.id}']`).classed("not-selected", false)

      // turn skills nodes on that are connected to the people node
      if(linkFilters.includes('currentSkills')) {
        d.currentSkills.forEach(skill => {d3.select(`[data-node='${skill}']`).classed("not-selected", false)})
      }

      if(linkFilters.includes('desiredSkills')) {
        d.desiredSkills.forEach(skill => {d3.select(`[data-node='${skill}']`).classed("not-selected", false)})
      }

    } else if (d.type === 'skill') { // if node clicked on is skill node

      d3.selectAll(`[data-target='${d.id}']`).classed("not-selected", false) // make all links connected to the skill node active

      // turn people nodes on that are connected to the skill node
      if(linkFilters.includes('currentSkills')) {
        d.hadBy.forEach(person => {d3.select(`[data-node='${person}']`).classed("not-selected", false)})
      }

      if(linkFilters.includes('desiredSkills')) {
        d.wantedBy.forEach(person => {d3.select(`[data-node='${person}']`).classed("not-selected", false)})
      }

    }
  }
}

function mouseover(d) {

  d3.select(this)
    .attr("stroke-width", 2)
    .attr("stroke", '#f2f2f2')

  const fullDetailsXPosition = document.getElementById('full-details').getBoundingClientRect();

	d3.select("#tooltip")
		.style("right", (width - fullDetailsXPosition.x + 260) + 15 + "px")
		.style("top", "15px")
		.select("#value")
		.text(d.name);
	d3.select("#tooltip").classed("hidden", false);
}

function mouseout(d) {
  d3.select("#tooltip").classed("hidden", true);
  d3.select(this)
    .attr("stroke-width", 0)
}

export function applyFilter() {
  // console.log("store allFilters: ",store.getState().data.allFilters)
  const {allFilters} = store.getState().data

  const minConnections = allFilters[1].minConnections

  // filter links
  const linkFilters = allFilters
    .filter(parent => parent.parentName === 'connections')[0].filters
    .filter(connections => connections.active)
    .map(connections => connections.name)

  // filter nodes
  const peopleFilters = allFilters
    .filter(parent => parent.parentName === 'people')[0].filters
    .filter(person => person.active)
    .map(person => person.name)

  const skillFilters = allFilters
    .filter(parent => parent.parentName === 'skills')[0].filters
    .filter(skill => skill.active)
    .map(skill => skill.name)

  const allNodeFilters = [].concat(skillFilters, peopleFilters)

  workingNodes = originalNodes.filter(originalNode =>
    minConnections <= noOfOccurences(originalNode, skillFilters)
    && allNodeFilters.includes(originalNode.name)
  )

  const currentNodesArray = workingNodes.map(node => node.name)

  workingLinks = originalLinks.filter(originalLink => linkFilters.includes(originalLink.type))
  .filter(workingLink => {
    return currentNodesArray.includes(workingLink.source.name) && currentNodesArray.includes(workingLink.target.name)
  })

  update()
  zoomed()
  clicked()
}

export function lookUpSkill(id) {
  return skills.filter(skill => skill.id === id)[0]
}

function noOfOccurences(originalNode, skillFilters) {
  if(originalNode.type === 'person') {
    originalNode.workingConnections = 0
    originalNode.currentSkills.forEach(skillId => {
      if(skillFilters.includes(lookUpSkill(skillId).name)) originalNode.workingConnections++
    })
  }
  return originalNode.workingConnections
}


function update() {
  link = link.data(workingLinks)
  link.exit().remove()
  link = link.enter().append("line")
    .merge(link)
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    // .attr("data-type", (d) => d.type)
    .attr("stroke", (d) => linkColor())
    .attr("stroke-dasharray", (d) => dashLine(d.type))
    .attr("stroke-width", (d) => 2);

  node = node.data(workingNodes)
  node.exit().remove()
  node = node.enter().append("circle")
    .merge(node)
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
    .attr("data-node", (d) => d.id)
    .on("click",clicked)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

  simulation.nodes(workingNodes);
  simulation.force("link").links(workingLinks);
  simulation.alpha(1).restart();
}

function zoomed() {
  if(d3.event) { // last zoom event saved to variable
    lastD3Event = d3.event.transform
  }

  node.attr("transform", lastD3Event);
  link.attr("transform", lastD3Event);
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
