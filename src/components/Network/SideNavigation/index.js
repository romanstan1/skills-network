import React, { Component } from 'react';
import {toggleFilter} from '../d3/network_functions.js'
import './style.css'

export default class SideNavigation extends Component {
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
  handleFilterClick = (e) => {
    console.log("eee",  e.target.value)
    toggleFilter(e.target.value)
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
            <Filter handleFilterClick={this.handleFilterClick}/> :
            <EditUserProfile/>
          }

        </div>
      </div>
    ]
  }
}

const Checkbox = ({handleFilterClick, id, filterName}) =>
<span className="checkbox">
  <input onClick={handleFilterClick} type="checkbox" value={filterName} id={id}/>
  <label htmlFor={id}></label>
</span>


const Filter = ({handleFilterClick}) =>
  <section className='filters'>
    <h3>Links</h3>
    
    <div className='single-filter'>
      <h4>Desired Skills</h4>
      <Checkbox filterName='desired' id='one' handleFilterClick={handleFilterClick}/>
    </div>

    <div className='single-filter'>
      <h4>Current Skills</h4>
      <Checkbox filterName='current' id='two' handleFilterClick={handleFilterClick}/>
    </div>

  </section>

const EditUserProfile = () =>
  <section>
    <p>

    </p>
  </section>
