import React, { Component } from 'react';
import {applyFilter} from '../d3/network_functions.js'
import './style.css'
import {connect} from 'react-redux'
import {toggleFilter, toggleSelectAllFilter} from '../../../store/modules/actions'
import Filters from './Filters'

class SideNavigation extends Component {
  state = {
    open: true,
    selectedNav: 'Filter'
  }
  toggleOpen = (e) => {
    this.setState({open: !this.state.open})
  }
  selectNav = (e) => {
    e.stopPropagation()
    this.setState({selectedNav: e.target.innerHTML})
  }
  handleFilterClick = (filterName, parentName) => {
    this.props.dispatch(toggleFilter(filterName, parentName))
    applyFilter()
  }
  handleSelectAllClick = (parentName) => {
    this.props.dispatch(toggleSelectAllFilter(parentName))
    applyFilter()
  }

  render() {
    const {open, selectedNav} = this.state
    return [
      <div key='sidenavigation'
        className={open? 'side-navigation open': 'side-navigation closed'}>

        <div
          // onClick={this.toggleOpen}
          className='openNavTab'>
          {/* <div className='chevron'/> */}
        </div>

        <div className='side-navigation-inner'>
          <nav>
            <span className={selectedNav === "Filter"? "selected": null}
              onClick={this.selectNav}>Filter</span>
            <span className={selectedNav === "Edit Profile"? "selected": null}
              onClick={this.selectNav}>Edit Profile</span>
          </nav>

          {
            selectedNav === "Filter"?
            <Filters
              allFilters={this.props.allFilters}
              handleFilterClick={this.handleFilterClick}
              handleSelectAllClick={this.handleSelectAllClick}/> :
            <EditUserProfile/>
          }

        </div>
      </div>
    ]
  }
}

export default connect(state => ({
  allFilters: state.data.allFilters
}))(SideNavigation)


const EditUserProfile = () =>
  <section>
    <p></p>
  </section>
