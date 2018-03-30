import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import {TextFilter} from 'react-text-filter';
import Filters from '../index'
import SingleFilter from './SingleFilter'

const personFilter = filter => person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1

export class AllFilter extends Component {
  state = {
    filter: ''
  }
  updateSearch = (e) => {
    this.setState({filter: e.target.value})
  }
  render() {
    let {filters, handleFilterClick} = this.props
    filters = this.state.filter ? filters.filter(personFilter(this.state.filter)) : filters.slice(0)

    return (<span>
      <TextFilter
        minLength={0}
        debounceTimeout={0}
        placeholder="Search"
        className="search-box"
        onFilter={this.updateSearch}>
      </TextFilter>

      {
        filters.map(filter =>
          <SingleFilter key={filter.name} filter={filter} parentName='people'/>
        )
      }
    </span>)
  }
}



export const PeopleTriggerSibling = ({groupFilter, subGroup, handleSubGroupSelect}) =>
<div
  onClick={()=>handleSubGroupSelect(subGroup)}
  className={
    !groupFilter.people.map(filter => filter.active).includes(false)?
    'select-all sub-group active people':'select-all sub-group people'}>
  <span></span>
</div>

export const ClientFilter = ({filters, handleFilterClick, uniqueClients, handleSubGroupSelect}) => {

  const clientFilters =  uniqueClients.map(client => {
    return {client, people: filters.filter(person => person.client === client)}
  })
  return clientFilters.map(clientFilter =>
  <span key={clientFilter.client}>
    <Collapsible
      className='sub-group' openedClassName='sub-group'
      triggerSibling={() =>
        <PeopleTriggerSibling
          groupFilter={clientFilter}
          subGroup={clientFilter.client}
          handleSubGroupSelect={handleSubGroupSelect}/>
      }
      transitionTime={100}
      trigger={humanize(clientFilter.client)}>
      {
        clientFilter.people.map(filter =>
          <SingleFilter key={filter.name} filter={filter} parentName='people'/>)
      }
    </Collapsible>
  </span>)
}

export const LocationFilter = ({filters, handleFilterClick, uniqueLocations, handleSubGroupSelect}) => {

  const locationFilters = uniqueLocations.map(uniqueLocation => {
    return {location: uniqueLocation,people: filters.filter(person => person.location === uniqueLocation)}
  })
  return locationFilters.map(locationFilter =>
  <span key={locationFilter.location}>
    <Collapsible
      className='sub-group' openedClassName='sub-group'
      triggerSibling={() =>
        <PeopleTriggerSibling
          groupFilter={locationFilter}
          subGroup={locationFilter.location}
          handleSubGroupSelect={handleSubGroupSelect}/>
      }
      transitionTime={100}
      trigger={humanize(locationFilter.location)}>
      {
        locationFilter.people.map(filter =>
          <SingleFilter key={filter.name} filter={filter} parentName='people'/>)
      }
    </Collapsible>
  </span>)
}

// export const IndividualPersonFilter = ({filter, handleFilterClick}) =>
// <div
//   key={filter.name}
//   className={
//     filter.active ?
//       filter.connectionFilterActive ?
//       'single-filter active people connectionFilterActive' : 'single-filter active people'
//     :'single-filter people'
//     }
//   onClick={()=>handleFilterClick(filter.name)} >
//   <h4>{humanize(filter.name)}</h4>
//   <span></span>
// </div>
