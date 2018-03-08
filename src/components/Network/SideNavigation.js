import React, { Component } from 'react';

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

  render() {
    const {open, selectedNav} = this.state
    return [
      <div key='sidenavigation'
        className={open? 'side-navigation open': 'side-navigation closed'}
        onClick={this.toggleOpen}>
        <div className='chevron'/>

        <div className='side-navigation-inner'>
          <nav>
            <span className={selectedNav === "Filter"? "selected": null}
              onClick={this.selectNav}>Filter</span>
            <span className={selectedNav === "Edit Profile"? "selected": null}
              onClick={this.selectNav}>Edit Profile</span>
          </nav>

          {
            selectedNav === "Filter"?
            <Filter/> :
            <EditUserProfile/>
          }

        </div>
      </div>
    ]
  }
}

const EditUserProfile = () =>
  <section>
    <p>
      
    </p>
  </section>

const Filter = () =>
  <section>
    <p>
      Filter Here
    </p>
  </section>
