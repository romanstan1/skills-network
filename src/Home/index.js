import React, { Component } from 'react';
import {connect} from 'react-redux'
import Network from './Network'
import SideNavigation from './SideNavigation'
import {fetchSkillNetworkData} from 'store/modules/actions'
// import {initializeDom} from './Network/d3/network_functions.js'
import Loader from './Loader'

class Main extends Component {
  componentDidMount() {
    this.fetchData()
  }
  state = {
    open: false
  }
  fetchData = () => {
    this.props.dispatch(fetchSkillNetworkData())
  }
  hideSideNavigation = () => {
    this.setState({open: !this.state.open})
  }
  render() {
    const {people, skills, failedData} = this.props
    return (
      <div id='main'>
        <SideNavigation
          open={this.state.open}
          hideSideNavigation={this.hideSideNavigation}
        />
        {!people.length && !skills.length?
           <Loader
             failedData={failedData}
             fetchData={this.fetchData}
           /> :
           <Network
             sideNavOpen={this.state.open}
           />
         }
      </div>
    )
  }
}

export default connect(state => ({
  people: state.data.people.filters,
  skills: state.data.skills.filters,
  failedData: state.data.failedData
}))(Main)
