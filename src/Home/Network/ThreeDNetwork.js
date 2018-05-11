import React from 'react';
import {connect} from 'react-redux'
import { ForceGraph3D } from 'react-force-graph';
import {peopleColour, skillsColour, connectionsColour} from '../../styles/theme'

const setNodeSize = (d) => {
  if(d.type === 'skill') return Math.pow((d.hadBy.length), 3) * 0.0005
  return 0.03
}

const setNodeColor = (d) => {
  if(d.type === 'person') return peopleColour
  else if(d.type === 'skill') return skillsColour
  else return '#ff00d0'
}

const setLinkColor = (d) => {
  return '#b78d5d'
}

const setLinkWidth = (d) => {
  if(d.type === 'currentSkills') return 0.1
  else if(d.type === 'desiredSkills') return 0.1
  return 100
}

const ThreeDNetwork = ({width, height, links, nodes}) =>
  <ForceGraph3D
    showNavInfo={false}
    width={width - 260}
    height={height}
    graphData={{nodes, links}}
    nodeAutoColorBy='type'
    nodeOpacity={0.97}
    nodeResolution={50}
    d3Force={'charge', null}
    d3Force={'link', null}
    backgroundColor='rgba(255, 0, 0, 0)'
    d3VelocityDecay={0.9}
    d3AlphaDecay={0.08}
    nodeVal={setNodeSize}
    nodeColor={setNodeColor}
    linkColor={setLinkColor}
    linkWidth={setLinkWidth}
    linkOpacity={0.4}
    linkResolution={20}
  />

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(ThreeDNetwork)
