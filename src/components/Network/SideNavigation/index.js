import React, { Component } from 'react';
import {applyFilter} from '../d3/network_functions.js'
import './style.css'
import {connect} from 'react-redux'
import {toggleFilter, toggleSelectAllFilter} from '../../../store/modules/actions'
import Filters from './Filters'

class SideNavigation extends Component {
  state = {
    selectedNav: 'Filter'
  }
  selectNav = (e) => {
    e.stopPropagation()
    this.setState({selectedNav: e.target.innerHTML})
  }
  render() {
    const {selectedNav} = this.state
    return [
      <div key='sidenavigation' className='side-navigation open'>
        <div className='openNavTab'/>
        <div className='side-navigation-inner'>
          <nav>
            <span
              className={selectedNav === "Filter"? "selected": null}
              onClick={this.selectNav}>Filter
            </span>
            <span
              className={selectedNav === "Edit Profile"? "selected": null}
              onClick={this.selectNav}>Edit Profile
            </span>
          </nav>
          { selectedNav === "Filter"? <Filters/> : <EditUserProfile/> }
        </div>
      </div>
    ]
  }
}

export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills,
  connections: state.data.connections
}))(SideNavigation)

const EditUserProfile = () =>
  <section>
    <br/>
    <p>[ Edit profile here ]</p>
  </section>
