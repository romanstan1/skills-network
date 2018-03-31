import React, { Component } from 'react';
import {connect} from 'react-redux'
import Network from './Network'
import SideNavigation from './SideNavigation'
import {fetchSkillNetworkData} from 'store/modules/actions'
// import {initializeDom} from './Network/d3/network_functions.js'
import Loader from './Loader'

class Main extends Component {
  componentDidMount() {
    // initializeDom()
    this.props.dispatch(fetchSkillNetworkData())
  }
  render() {
    const {people, skills} = this.props
    return (
      <div id='main'>
        <SideNavigation key='sidenavigation'/>
        {!people.length && !skills.length? <Loader/> : <Network/>}
      </div>
    )
  }
}

export default connect(state => ({
  people: state.data.people.filters,
  skills: state.data.skills.filters,
}))(Main)
