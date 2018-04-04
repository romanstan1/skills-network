import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {render} from './d3/network_functions.js'
import Tooltip from './Tooltip'
import FullDetails from './FullDetails'
import FullScreenIcon from './FullScreenIcon'
// import * as d3 from "d3";
import {constructLinks, render, update} from './D3_modules'

class Network extends Component {

  componentDidMount() {
    const {nodes, links} = this.constructForceNetwork(this.props)
    render(nodes, links)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links} = this.constructForceNetwork(nextProps)
    update(nodes, links)
  }

  constructForceNetwork({people, skills, connections}) {
    const links = constructLinks(people, skills, connections)
    const nodes = [].concat(people, skills)
    return {nodes, links}
  }

  render() {
    return [
      <svg key='svg'></svg>,
      <FullScreenIcon key='fullscreenicon'/>,
      <Tooltip key='tooltip'/>,
      <FullDetails key='fulldetails'/>
    ]
  }
}

export default connect(state => ({
  people: state.data.people.filters.filter(person => person.active && !person.connectionFilterActive),
  skills: state.data.skills.filters.filter(skill => skill.active),
  connections: state.data.connections
}))(Network)
