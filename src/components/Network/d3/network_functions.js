import * as d3 from "d3";
import $ from "jquery";
import store from '../../../store'
import {clickPerson, clickSkill} from '../../../store/modules/actions'

let width, height, svg, simulation, link, node, charge
let dataNodes, dataLinks
let resizeId
const {dispatch} = store

export function initializeDom(people, skills) {
  // construct nodesArray
  const skillsNodes = skills.map((nodeps) => {
    return {
      ...nodeps,
      person_count: 20,
      people_current:[],
      people_desired:[]
    }
  })
  const nodesArray = [].concat(people, skillsNodes)

  // construct linksArray
  let linksArray = []
  people.forEach((person, ind) => {
    person.skills.forEach((skill, i) => {
      linksArray.push({"source": person.id, "target": skill, "type": "current"})
      skillsNodes.filter(skillNode => skillNode.id === skill)[0].people_current.push(person.name)
    })
    person.desired_skills.forEach((skill, i) => {
      linksArray.push({"source": person.id, "target": skill, "type": "desired"})
      skillsNodes.filter(skillNode => skillNode.id === skill)[0].people_desired.push(person.name)
    })
  })

  dataNodes = nodesArray
  dataLinks = linksArray
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
    .data(dataLinks)
    .enter().append("line")
    .attr("stroke", (d) => linkColor(d.type))
    .attr("stroke-width", (d) => 2);

  node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(dataNodes)
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

  // node
  //   .append("title")
  //   .text(d => d.id);

  simulation
    .nodes(dataNodes)
    .on("tick", ticked)
    .force("link")
    .links(dataLinks)
}

function nodeColor(type) {
  if(type === 'person') return '#dd1338'
  else if(type === 'skill') return '#0e42d1'
  else return '#ff00d0'
}

function linkColor(type) {
  if(type === 'current') return '#dce5dc'
  else if(type === 'desired') return '#49c67b'
  else return '#ff00d0'
}

function nodeSize(d) {
  if(d.person_count) {
    return Math.pow((d.people_current.length + d.people_desired.length), 1.2) + 9
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

export function toggleFilter(para) {
  console.log("toggleFilter", para)
  d3.selectAll("line")
  .attr("stroke", (d) => linkColor(para))
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
