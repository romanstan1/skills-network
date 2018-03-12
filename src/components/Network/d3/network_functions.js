import * as d3 from "d3";
import store from '../../../store'
import {clickPerson, clickSkill,closeFullDetails} from '../../../store/modules/actions'
import {lookUpSkill} from '../../../store/modules/reducers'
import './network_modules'

let width, height, svg, simulation, link, node
let originalNodes, originalLinks
let workingNodes, workingLinks
let lastD3Event
const {dispatch} = store
const {people, skills, allFilters} = store.getState().data

export function initializeDom() {
  // construct nodesArray
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

function render() {
  width = window.innerWidth
  height = window.innerHeight

  svg = d3.select("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed))

  const forceX = d3.forceX(width / 2).strength(0.030)
  const forceY = d3.forceY(height / 2).strength(0.030)

  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d.id).strength(0.01))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', forceX)
    .force('y',  forceY)

  link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(workingLinks)
    .enter().append("line")
    .attr("stroke", (d) => linkColor(d.type))
    .attr("stroke-width", (d) => 2);

  node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(workingNodes)
    .enter().append("circle")
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
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
}

function nodeColor(type) {
  if(type === 'person') return '#dd1338'
  else if(type === 'skill') return '#0e42d1'
  else return '#ff00d0'
}

function linkColor(type) {
  if(type === 'currentSkills') return '#dce5dc'
  else if(type === 'desiredSkills') return '#49c67b'
  else return '#ff00d0'
}

function nodeSize(d) {
  if(d.personCount) { // effectively checks if its a skill node
    return Math.pow((d.peopleCurrent.length + d.peopleDesired.length), 1.2) + 9
  }
  else return 10
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
  if(d.type === 'person') dispatch(clickPerson(d))
  else if(d.type === 'skill') dispatch(clickSkill(d))

  const thisNode = d3.select(this)

  if(thisNode.classed("selected")) {
    thisNode.classed("selected", false)
    dispatch(closeFullDetails())
  }
  else {
    d3.selectAll("circle").classed("selected", false)
    thisNode.classed("selected", true)
  }
}

function mouseover(d) {
  var xPosition = parseFloat(d3.select(this).attr("cx")) + 5
	var yPosition = parseFloat(d3.select(this).attr("cy"))

  d3.select(this)
    .attr("stroke-width", 1)
    .attr("stroke", '#f2f2f2')

	d3.select("#tooltip")
		.style("left", xPosition + "px")
		.style("top", yPosition + "px")
		.select("#value")
		.text(d.name);
	d3.select("#tooltip").classed("hidden", false);
}

function mouseout(d) {
  d3.select("#tooltip").classed("hidden", true);
  d3.select(this)
    .attr("stroke-width", 0)
    .attr("stroke", '#f2f2f2')
}

export function applyFilter() {
  // console.log("store allFilters: ",store.getState().data.allFilters)
  const {allFilters} = store.getState().data

  const minConnections = allFilters[0].minConnections

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
    minConnections <= noOfOccurences(originalNode, skillFilters, peopleFilters)
    && allNodeFilters.includes(originalNode.name)
  )

  const currentNodesArray = workingNodes.map(node => node.name)

  workingLinks = originalLinks.filter(originalLink => linkFilters.includes(originalLink.type))
  .filter(workingLink => {
    return currentNodesArray.includes(workingLink.source.name) && currentNodesArray.includes(workingLink.target.name)
    // return peopleFilters.includes(workingLink.source.name) && skillFilters.includes(workingLink.target.name)
  })

  update()
  zoomed()
}

function noOfOccurences(originalNode, skillFilters, peopleFilters) {
  if(originalNode.type === 'person') {
    originalNode.workingConnections = 0
    originalNode.currentSkills.forEach(skillId => {
      if(skillFilters.includes(lookUpSkill(skillId).name)) originalNode.workingConnections++
    })
  }
  // else if (originalNode.type === 'skill' ) {
  //   originalNode.peopleCurrent.forEach(personName => {
  //     if(peopleFilters.includes(personName)) originalNode.workingConnections++
  //   })
  // }
  return originalNode.workingConnections
}


function update() {
  link = link.data(workingLinks)
  link.exit().remove()
  link = link.enter().append("line")
    .merge(link)
    .attr("stroke", (d) => linkColor(d.type))
    .attr("stroke-width", (d) => 2);

  node = node.data(workingNodes)
  node.exit().remove()
  node = node.enter().append("circle")
    .merge(node)
    .attr("r", (d) => nodeSize(d))
    .attr("fill", (d) => nodeColor(d.type))
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
