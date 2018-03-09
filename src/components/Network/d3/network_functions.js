import * as d3 from "d3";
import $ from "jquery";
import store from '../../../store'
import {clickPerson, clickSkill} from '../../../store/modules/actions'

let width, height, svg, simulation, link, node, charge
let originalNodes, originalLinks
let workingNodes, workingLinks
let resizeId
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


$(window).resize(function() {
  clearTimeout(resizeId);
  resizeId = setTimeout(reset, 500);
});

function reset(){
  svg.selectAll("*").remove();
  width = null
  height  = null
  svg  = null
  simulation  = null
  link = null
  node = null
  charge = null
  render()
}

function render() {
  width = window.innerWidth
  height = window.innerHeight

  svg = d3.select("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height);

  charge = d3.forceManyBody().strength(-500)

  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d.id))
    .force("charge", charge)
    .force("center", d3.forceCenter(width / 2, height / 2));

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

  d3.selectAll("circle").classed("selected", false)
  d3.select(this).classed("selected", true)
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

  // filter links
  const linkFilters = allFilters
    .filter(parent => parent.parentName === 'skillProficiency')[0].filters
    .filter(skillProficiency => skillProficiency.active)
    .map(skillProficiency => skillProficiency.name)

  workingLinks = originalLinks.filter(originalLink => linkFilters.includes(originalLink.type))

  // filter nodes
  update()
}

function update() {
  link = link.data(workingLinks)
  link.exit().remove()
  link = link.enter().append("line")
    .merge(link)
    .attr("stroke", (d) => linkColor(d.type))
    .attr("stroke-width", (d) => 2);

  simulation.nodes(workingNodes);
  simulation.force("link").links(workingLinks);
  simulation.alpha(1).restart();
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
