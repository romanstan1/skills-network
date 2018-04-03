import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {initializeDom} from './d3/network_functions.js'
// import SideNavigation from './SideNavigation'
import Tooltip from './Tooltip'
import FullDetails from './FullDetails'
import FullScreenIcon from './FullScreenIcon'

// class Svg extends Component {
//   shouldComponentUpdate(nextProps) {
//     return false;
//   }
//   render() {
//     return <svg/>
//   }
// }

class Network extends Component {
  componentDidMount() {
    // initializeDom()
    // this.props.dispatch(fetchSkillNetworkData())
  }
  componentWillReceiveProps(nextProps) {

    const people = nextProps.people
    const skills = nextProps.skills

    console.log("componentDidReceiveProps people", people)
    console.log("componentDidReceiveProps skills", skills)
  }

  render() {
    // console.log("Network")
    return [
      <svg key='svg'></svg>,
      <FullScreenIcon key='fullscreenicon'/>,
      // <SideNavigation key='sidenavigation'/>,
      <Tooltip key='tooltip'/>,
      <FullDetails key='fulldetails'/>
    ]
  }
}

export default connect(state => ({
  people: state.data.people.filters.filter(person => person.active && !person.connectionFilterActive),
  skills: state.data.skills.filters.filter(skill => skill.active),
}))(Network)
