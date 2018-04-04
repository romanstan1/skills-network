import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {initializeDom} from './d3/network_functions.js'
// import SideNavigation from './SideNavigation'
import Tooltip from './Tooltip'
import FullDetails from './FullDetails'
import FullScreenIcon from './FullScreenIcon'
import * as d3 from "d3";
import {constructLinks} from './D3_modules'

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
    const connections = nextProps.connections
    const links = constructLinks(people, skills, connections)

    console.log("links",links)
    console.log("componentDidReceiveProps people", people)
    console.log("componentDidReceiveProps skills", skills)
  }








  render() {
    return [
      <svg
        key='svg'
        ref={node => this.node = node}
        width={500} height={500}>
      </svg>,
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
  connections: state.data.connections
}))(Network)
