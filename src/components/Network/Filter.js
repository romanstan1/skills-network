import React, { Component } from 'react';

export default class Filter extends Component {
  state = {
    open: false,
    nav: 'Filter'
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }
  selectNav = (e) => {
    e.stopPropagation()
    this.setState({nav: e.target.innerHTML})
  }

  render() {
    return [
      <div key='filter'
        className={this.state.open? 'filter-panel open': 'filter-panel closed'}
        onClick={this.toggleOpen}>
        <div className='chevron'/>

        <div className='filter-inner'>
          <nav>
            <span className={this.state.nav === "Filter"? "selected": null}
              onClick={this.selectNav}>Filter</span>
            <span className={this.state.nav === "Edit Profile"? "selected": null}
              onClick={this.selectNav}>Edit Profile</span>
          </nav>
          <section>

          </section>
        </div>
      </div>
    ]
  }
}
