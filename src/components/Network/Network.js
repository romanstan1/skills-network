import React, { Component } from 'react';
import {connect} from 'react-redux'
import {initializeDom} from './d3/network_functions.js'
import Filter from './Filter'
import Tooltip from './Tooltip'
import UserProfile from './UserProfile'

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
      <Filter key='filter'/>,
      <Tooltip key='tooltip'/>,
      <UserProfile key='userprofile'/>
    ]
  }
}

export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills
}))(Network)
