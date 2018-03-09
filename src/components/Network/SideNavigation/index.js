import React, { Component } from 'react';
import {applyFilter} from '../d3/network_functions.js'
import './style.css'
import {connect} from 'react-redux'
import {toggleFilter, toggleSelectAllFilter} from '../../../store/modules/actions'
import humanize from 'string-humanize'

class SideNavigation extends Component {
  state = {
    open: false,
    selectedNav: 'Filter'
  }

  toggleOpen = () => {
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
    // applyFilter()
  }

  render() {
    const {open, selectedNav} = this.state
    return [
      <div key='sidenavigation'
        className={open? 'side-navigation open': 'side-navigation closed'}>

        <div onClick={this.toggleOpen} className='openNavTab'>
          <div className='chevron'/>
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


const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>
        <div
          className='parent-name'
          onClick={()=>handleSelectAllClick(parent.parentName)}>
          <h3>{humanize(parent.parentName)}</h3>
          <div className='active'><span></span></div>
        </div>
        {
          parent.filters.map(filter =>
            <div
              key={filter.name}
              className={filter.active ? 'single-filter active':'single-filter'}
              onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
              <h4>{humanize(filter.name)}</h4>
              <span></span>
            </div>
          )
        }
      </span>
    ))
  }
</section>

const EditUserProfile = () =>
  <section>
    <p>

    </p>
  </section>
