import React, { Component } from 'react';
import {connect} from 'react-redux'
import {initializeDom} from './d3/network_functions.js'
import Filter from './Filter'

class Network extends Component {
  componentDidMount() {
    const {people, skills} = this.props
    initializeDom(people, skills)
  }
  shouldComponentUpdate(nextProps) {
    return false;
  }
  render() {
    // return <div key='network' id='network'></div>
    return [
      <svg key='svg'></svg>,
      <Filter key='filter'/>
    ]
  }
}

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes,
  people: state.data.people,
  skills: state.data.skills
}))(Network)
