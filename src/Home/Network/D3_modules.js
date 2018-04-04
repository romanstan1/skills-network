import * as d3 from "d3";
import {peopleColour, skillsColour, connectionsColour} from '../../styles/theme'

let node, link, simulation

export function constructLinks(people, skills, connections){

  const currentSkills = connections.filters.filter(connection =>
    connection.name === 'currentSkills' && connection.active).length
  const desiredSkills = connections.filters.filter(connection =>
    connection.name === 'desiredSkills' && connection.active).length

  let linksArray = []

  people.forEach((person, ind) => {

    // Check whether current skills filter is active
    if(currentSkills) {
      person.currentSkills.forEach((skillId, i) => {
        // Check whether the skill node is active
        if(skills.find(skill => skill.id === skillId)) {
          linksArray.push({"source": person.id, "target": skillId, "type": "currentSkills"})
        }
      })
    }

    // Check whether desired skills filter is active
    if(desiredSkills) {
      person.desiredSkills.forEach((skillId, i) => {
        // Check whether the skill node is active
        if(skills.find(skill => skill.id === skillId)) {
          linksArray.push({"source": person.id, "target": skillId, "type": "desiredSkills"})
        }
      })
    }

  })

  return linksArray
  // skills.filter(skillNode => skillNode.id === skill)[0].peopleCurrent.push(person.name)
  // skills.filter(skillNode => skillNode.id === skill)[0].peopleDesired.push(person.name)
}


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

export function render(nodes, links) {
  const width = window.innerWidth - 260
  const height = window.innerHeight

  const svg = d3.select("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
    // .call(d3.zoom()
    //   .scaleExtent([0.7 , 20.0])
    //   .on("zoom", zoomed))

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
    // .on("click",clicked)
    // .on("mouseover", mouseover)
    // .on("mouseout", mouseout)
    // .call(d3.drag()
    // .on("start", dragstarted)
    // .on("drag", dragged)
    // .on("end", dragended));

  simulation
    .nodes(nodes)
    .on("tick", ()=>ticked(node, link))
    .force("link")
    .links(links)

  link
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    // .attr("data-type", (d) => d.type)
}

function ticked(node, link) {
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

export function update(nodes, links) {
  link = link.data(links)
  link.exit().remove()
  link = link.enter().append("line")
    .merge(link)
    .attr("data-target", (d) => d.target.id)
    .attr("data-source", (d) => d.source.id)
    // .attr("data-type", (d) => d.type)
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
    // .on("click",clicked)
    // .on("mouseover", mouseover)
    // .on("mouseout", mouseout)
    // .call(d3.drag()
    // .on("start", dragstarted)
    // .on("drag", dragged)
    // .on("end", dragended));

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}
