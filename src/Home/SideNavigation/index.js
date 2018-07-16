import React, { Component } from 'react';
import './style.css'
import Filters from './Filters'

const Nav = ({selectedNav, handleSelectNav}) =>
<nav>
  <span
    className={selectedNav === "Filter"? "selected": null}
    onClick={handleSelectNav}>Filter
  </span>
  <span
    className={selectedNav === "Edit Profile"? "selected": null}
    onClick={handleSelectNav}>Edit Profile
  </span>
</nav>

const EditUserProfile = () =>
<section>
  <br/>
  <p>[ Edit profile here ]</p>
</section>

export default class SideNavigation extends Component {
  state = {
    selectedNav: 'Filter'
  }
  handleSelectNav = (e) => {
    e.stopPropagation()
    this.setState({selectedNav: e.target.innerHTML})
  }
  render() {
    const {selectedNav} = this.state
    return [
      <div key='sidenavigation' className='side-navigation open'>
        <div className='openNavTab'/>
        <div className='side-navigation-inner'>
          {/* <Nav
            selectedNav={selectedNav}
            handleSelectNav={this.handleSelectNav}
          /> */}
          { selectedNav === "Filter"? <Filters/> : <EditUserProfile/> }
        </div>
      </div>
    ]
  }
}
