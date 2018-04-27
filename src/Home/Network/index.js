import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {render} from './d3/network_functions.js'
import Tooltip from './Tooltip'
import FullDetails from './FullDetails'
import FullScreenIcon from './FullScreenIcon'
import {render, update} from './D3_modules'
import constructLinks from './constructLinks'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
// import ForceGraph3D from '3d-force-graph';
import {peopleColour, skillsColour, connectionsColour} from '../../styles/theme'
import SelectDimension from './SelectDimension'

class Network extends Component {

  state = {
    nodes: [],
    links: [],
    width: window.innerWidth,
    height: window.innerHeight
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateScreenDimensions);
    const {nodes, links} = this.constructForceNetwork(this.props)
    this.setState({nodes, links})
    // render(nodes, links)
  }

  updateScreenDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links} = this.constructForceNetwork(nextProps)
    this.setState({nodes, links})
    // update(nodes, links)

    // const elem = document.getElementById('3d-graph')


    const data =  { nodes, links }

    // console.log("nodes",nodes)
    // console.log("links",links)

    // this.graph = ForceGraph3D()(elem)
    //   .graphData(data)
    //   .nodeAutoColorBy('type')

  }

  constructForceNetwork({people, skills, connections}) {
    const links = constructLinks(people, skills, connections)
    const nodes = [].concat(people, skills)
    return {nodes, links}
  }

  setNodeSize = (d) => {
    if(d.type === 'skill') {
      return Math.pow((d.hadBy.length), 3) * 0.0005
    } else {
      return 0.03
    }
  }

  setNodeColor = (d) => {
    if(d.type === 'person') return peopleColour
    else if(d.type === 'skill') return skillsColour
    else return '#ff00d0'
  }

  setLinkColor = (d) => {
    return '#b78d5d'
  }

  setLinkWidth = (d) => {
    if(d.type === 'currentSkills') return 0.1
    else if(d.type === 'desiredSkills') return 0.1
    return 100
  }

  render() {
    const {nodes, links, width, height} = this.state
    return [
      // <svg key='svg'></svg>,
      // <canvas key='canvas' ref="canvas" style={{width:'100%', height:'100%'}}/>,

      <Tooltip key='tooltip'/>,
      <FullDetails key='fulldetails'/>,
      // <div id='3d-graph' ref="3d-graph" key='3d-graph'
      //   // style={{width:'100%', height:'100%'}}
      // />,
      <div id='threedGraph' key='3d'>
        {
          this.props.dimension === '3D' ?
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
            nodeVal={this.setNodeSize}
            nodeColor={this.setNodeColor}
            linkColor={this.setLinkColor}
            linkWidth={this.setLinkWidth}
            linkOpacity={0.4}
            linkResolution={20}
          />
          :
          <div
            id='3d-graph'
            ref="3d-graph" key='3d-graph'
            style={{width, height}}
          />
        }
      </div>,
      <FullScreenIcon key='fullscreenicon'/>,
      <SelectDimension key='selectdimension'/>
    ]
  }
}

export default connect(state => ({
  people: state.data.people.filters.filter(person => person.active && !person.connectionFilterActive),
  skills: state.data.skills.filters.filter(skill => skill.active),
  connections: state.data.connections,
  dimension: state.data.dimension
}))(Network)
