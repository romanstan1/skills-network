import React, { Component } from 'react';
import humanize from 'string-humanize'

class PeopleFilters extends Component {
  state = {
    groupBy: 'All'
  }
  handleGroupClick = (value) => {
    this.setState({groupBy: value})
  }
  render() {
    const {parent, handleFilterClick} = this.props
    const allPeople = parent

    return (
    <span>
      {/* <div onClick={()=> this.handleGroupClick(groupBy[1])}>
        {this.state.groupBy}
      </div> */}
      {
        allPeople.filters.map(filter =>
        <div
          key={filter.name}
          className={filter.active ? 'single-filter active':'single-filter'}
          onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
          <h4>{humanize(filter.name)}</h4>
          <span></span>
        </div>)
      }
    </span>
    )
  }
}
export default PeopleFilters
