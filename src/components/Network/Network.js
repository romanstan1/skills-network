import React, { Component } from 'react';
import {connect} from 'react-redux'
import {initializeDom} from './d3/network_functions.js'
import SideNavigation from './SideNavigation'
import Tooltip from './Tooltip'
import Profile from './Profile'

class Network extends Component {
  componentDidMount() {
    const {people, skills} = this.props
    initializeDom(people, skills)
  }
  shouldComponentUpdate(nextProps) {
    return false;
  }
  render() {
    return [
      <svg key='svg'></svg>,
      <SideNavigation key='sidenavigation'/>,
      <Tooltip key='tooltip'/>,
      <Profile key='profile'/>
    ]
  }
}

export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills
}))(Network)
