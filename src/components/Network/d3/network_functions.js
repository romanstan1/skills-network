import * as d3 from "d3";
import $ from "jquery";

let width, height, svg, simulation, link, node, charge
let dataNodes, dataLinks
let resizeId

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
  console.log("skillsNodes",skillsNodes)
  console.log("peopleNodes",people)


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
  else if(type === 'skill') return '#072ef4'
  else return '#ff00d0'
}

function linkColor(type) {
  if(type === 'current') return '#2bba00'
  else if(type === 'desired') return '#ffd326'
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
