import React, { Component } from 'react';

export default class Filter extends Component {
  state = {
    open: false
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    return [
      <div key='filter'
        className={this.state.open? 'filter-panel open': 'filter-panel closed'}
        onClick={this.toggleOpen}>
        <div className='chevron'/>
        <p>
          Filter panel
          <br/><br/>
          Profile
        </p>
      </div>
    ]
  }
}
