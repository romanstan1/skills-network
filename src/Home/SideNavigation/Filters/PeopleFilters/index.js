import React, { Component } from 'react';
import humanize from 'string-humanize'
import {connect} from 'react-redux'
// import {applyFilter} from '../../../d3/network_functions.js'
import {subGroupSelect} from 'store/modules/actions'
import DropdownMenu from 'react-dd-menu';
import collapsibleHOC from '../collapsibleHOC'
import {AllFilters, GroupFilters} from './filterModules'

class PeopleFilters extends Component {
  state = {
    groupBy: 'all',
    isGroupByOpen: false,
  }
  handleSubGroupSelect = (subGroup) => {
    this.props.dispatch(subGroupSelect(subGroup))
    // applyFilter()
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

        {
          groupBy === 'all'?
          <AllFilters filters={filters}/> :
          <GroupFilters
            filters={filters}
            uniques={groupBy === 'location'? uniqueLocations : uniqueClients}
            handleSubGroupSelect={this.handleSubGroupSelect}
            groupBy={groupBy}
          />
        }
      </span>
    )
  }
}

export default connect(state => ({
  people: state.data.people
}))(collapsibleHOC(PeopleFilters))
