import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import {connect} from 'react-redux'
import {applyFilter} from '../../d3/network_functions.js'
import {toggleFilter, subGroupSelect} from '../../../../store/modules/actions'
import DropdownMenu from 'react-dd-menu';

class PeopleFilters extends Component {
  state = {
    groupBy: 'all',
    isGroupByOpen: false,
  }
  handleFilterClick = (filterName) => {
    console.log("handleFilterClick")
    this.props.dispatch(toggleFilter(filterName, this.props.peopleFilter.parentName))
    applyFilter()
  }

  handleSubGroupSelect = (subGroup) => {
    this.props.dispatch(subGroupSelect(subGroup))
  }

  handleGroupBySelect = (e) => {
    console.log("handleGroupBySelect")
    this.setState({groupBy: e.target.dataset.value, isGroupByOpen: false})
  }
  handleGroupByToggle = () => {
    console.log("handleGroupByToggle")
    this.setState({isGroupByOpen: !this.state.isGroupByOpen})
  }


  render() {
    const {
      groupByList,
      uniqueLocations,
      uniqueClients,
      filters} = this.props.peopleFilter

    const {groupBy, isGroupByOpen} = this.state

    console.log("groupBy",groupBy)

    const menuOptions = {
      isOpen: isGroupByOpen,
      close: ()=>{},
      toggle: <div
                className="group-by-button"
                onClick={this.handleGroupByToggle}
                onBlur={this.handleGroupByToggle}
                >Group - {groupBy}
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

const AllFilter = ({filters, handleFilterClick}) => {
  return filters.map(filter =>
  <div
    key={filter.name}
    className={filter.active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(filter.name)} >
    <h4>{humanize(filter.name)}</h4>
    <span></span>
  </div>)
}

const LocationFilter = ({filters, handleFilterClick, uniqueLocations, handleSubGroupSelect}) => {

  const locationFilters =  uniqueLocations.map(uniqueLocation => {
    return {location: uniqueLocation,
      people: filters.filter(person => person.location === uniqueLocation)}
  })

  console.log("LocationFilter",LocationFilter)

  return locationFilters.map(locationFilter =>
  <span key={locationFilter.location}>
    <Collapsible
      className='sub-group'
      triggerSibling={() =>
        <div
          onClick={()=>handleSubGroupSelect(locationFilter.location)}
          className={
            !locationFilter.people.map(filter => filter.active).includes(false)?
            'select-all active':'select-all' }>
          <span></span>
        </div>}
      transitionTime={100}
      trigger={humanize(locationFilter.location)}>
      {
        locationFilter.people.map(filter =>
        <div
          key={filter.name}
          className={filter.active ? 'single-filter active':'single-filter'}
          onClick={()=>handleFilterClick(filter.name)} >
          <h4>{humanize(filter.name)}</h4>
          <span></span>
        </div>)
      }
    </Collapsible>
  </span>)
}



const ClientFilter = ({filters, handleFilterClick, uniqueClients, handleSubGroupSelect}) => {
  const clientFilters =  uniqueClients.map(client => {
    return {client,
      people: filters.filter(person => person.client === client)}
  })

  console.log("clientFilters",clientFilters)
  return clientFilters.map(clientFilter =>
  <span key={clientFilter.client}>
    <Collapsible
      className='sub-group'
      triggerSibling={() =>
        <div
          onClick={()=>handleSubGroupSelect(clientFilter.client)}
          className={
            !clientFilter.people.map(filter => filter.active).includes(false)?
            'select-all active':'select-all' }>
          <span></span>
        </div>}
      transitionTime={100}
      trigger={humanize(clientFilter.client)}>
      {
        clientFilter.people.map(filter =>
        <div
          key={filter.name}
          className={filter.active ? 'single-filter active':'single-filter'}
          onClick={()=>handleFilterClick(filter.name)} >
          <h4>{humanize(filter.name)}</h4>
          <span></span>
        </div>)
      }
    </Collapsible>
  </span>)
}

export default connect(state => ({
  peopleFilter: state.data.allFilters.filter(filter => filter.parentName === 'people')[0]
}))(PeopleFilters)
