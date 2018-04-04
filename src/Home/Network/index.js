import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {render} from './d3/network_functions.js'
import Tooltip from './Tooltip'
import FullDetails from './FullDetails'
import FullScreenIcon from './FullScreenIcon'
import {constructLinks, render, update} from './D3_modules'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

class Network extends Component {

  state = {
    nodes: [],
    links: []
  }

  componentDidMount() {
    const {nodes, links} = this.constructForceNetwork(this.props)
    this.setState({nodes, links})
    // render(nodes, links)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links} = this.constructForceNetwork(nextProps)
    this.setState({nodes, links})
    // update(nodes, links)
  }

  constructForceNetwork({people, skills, connections}) {
    const links = constructLinks(people, skills, connections)
    const nodes = [].concat(people, skills)
    return {nodes, links}
  }

  render() {
    const {nodes, links} = this.state
    return [
      // <svg key='svg'></svg>,
      <FullScreenIcon key='fullscreenicon'/>,
      <Tooltip key='tooltip'/>,
      <FullDetails key='fulldetails'/>,
      <div id='threedGraph' key='3d'>
        <ForceGraph3D
          showNavInfo={false}
          width={window.innerWidth - 260}
          graphData={{nodes, links}} />
      </div>
    ]
  }
}

export default connect(state => ({
  people: state.data.people.filters.filter(person => person.active && !person.connectionFilterActive),
  skills: state.data.skills.filters.filter(skill => skill.active),
  connections: state.data.connections
}))(Network)
