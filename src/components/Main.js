import React, { Component } from 'react';
import {connect} from 'react-redux'
import Network from './Network/Network.js'
import SideNavigation from './Network/SideNavigation'
import './loader.css'
import {fetchSkillNetworkData} from '../store/modules/actions'
// import {initializeDom} from './Network/d3/network_functions.js'



const Loader = () =>
<div className="loader">
  <div className="bubble"></div>
  <div className="bubble"></div>
  <div className="bubble"></div>
  <div className="bubble"></div>
</div>

class Main extends Component {
  componentDidMount() {
    // initializeDom()
    console.log("didmount",this)
    this.props.dispatch(fetchSkillNetworkData())
  }
  render() {
    const {people, skills} = this.props
    return (
      <div id='main'>
        <SideNavigation key='sidenavigation'/>
        {!people.length && !skills.length? <Loader/> : <Network/>}
        {/* {!people.length && !skills.length? <Loader/> : <Network/>} */}
      </div>
    )
  }
}

export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills
}))(Main)
