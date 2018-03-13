import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import {connect} from 'react-redux'
import {applyFilter} from '../../d3/network_functions.js'
import {toggleFilter} from '../../../../store/modules/actions'

class PeopleFilters extends Component {
  state = {
    groupBy: 'All'
  }
  handleGroupBySelect = (groupBy) => {
    this.setState({groupBy})
  }
  handleFilterClick = (filterName) => {
    this.props.dispatch(toggleFilter(filterName, this.props.peopleFilter.parentName))
    applyFilter()
  }
  handle
  render() {
    const {
      groupBy,
      uniqueLocations,
      uniqueClients,
      filters,
      locationFilters,
      clientFilters} = this.props.peopleFilter

    return (
    <span>
      {/* <div onClick={()=> this.handleGroupBySelect(groupBy[1])}>
        {this.state.groupBy}
      </div> */}
      {
        filters.map(filter =>
        <div
          key={filter.name}
          className={filter.active ? 'single-filter active':'single-filter'}
          onClick={()=>this.handleFilterClick(filter.name)} >
          <h4>{humanize(filter.name)}</h4>
          <span></span>
        </div>)
      }
    </span>
    )
  }
}

export default connect(state => ({
  peopleFilter: state.data.allFilters.filter(filter => filter.parentName === 'people')[0]
}))(PeopleFilters)
