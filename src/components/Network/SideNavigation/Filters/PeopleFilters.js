import React, { Component } from 'react';
import humanize from 'string-humanize'
import {connect} from 'react-redux'
import {applyFilter} from '../../d3/network_functions.js'
import {toggleFilter, subGroupSelect} from '../../../../store/modules/actions'
import DropdownMenu from 'react-dd-menu';
import collapsibleHOC from './collapsibleHOC'
import {AllFilter, ClientFilter, LocationFilter} from './filterModules'

class PeopleFilters extends Component {
  state = {
    groupBy: 'all',
    isGroupByOpen: false,
  }
  handleFilterClick = (filterName) => {
    this.props.dispatch(toggleFilter(filterName, this.props.peopleFilter.parentName))
    applyFilter()
  }
  handleSubGroupSelect = (subGroup) => {
    this.props.dispatch(subGroupSelect(subGroup))
    applyFilter()
  }
  handleGroupBySelect = (e) => {
    this.setState({groupBy: e.target.dataset.value, isGroupByOpen: false})
  }
  handleGroupByToggle = () => {
    this.setState({isGroupByOpen: !this.state.isGroupByOpen})
  }
  render() {
    const {groupByList,uniqueLocations,uniqueClients,filters} = this.props.people
    const {groupBy, isGroupByOpen} = this.state
    const menuOptions = {
      isOpen: isGroupByOpen,
      close: ()=>{},
      toggle: <div
                className="group-by-button"
                onClick={this.handleGroupByToggle}
                onBlur={this.handleGroupByToggle}
                >Group by - {humanize(groupBy)}
              </div>
    }
    return (
    <span>
      <DropdownMenu {...menuOptions}>
        {
          groupByList.filter(item => item !== groupBy).map(item =>
            <div key={item} data-value={item}
              onClick={this.handleGroupBySelect}>{item}
            </div>)
        }
      </DropdownMenu>

      {groupBy === 'all'? <AllFilter filters={filters} handleFilterClick={this.handleFilterClick}/>: null}
      {
        groupBy === 'location'?
        <LocationFilter
          filters={filters}
          handleFilterClick={this.handleFilterClick}
          uniqueLocations={uniqueLocations}
          handleSubGroupSelect={this.handleSubGroupSelect}
        />:null
      }
      {
        groupBy === 'clients'?
        <ClientFilter
          filters={filters}
          handleFilterClick={this.handleFilterClick}
          uniqueClients={uniqueClients}
          handleSubGroupSelect={this.handleSubGroupSelect}
        />:null
      }

    </span>
    )
  }
}

export default connect(state => ({
  people: state.data.people
}))(collapsibleHOC(PeopleFilters))
