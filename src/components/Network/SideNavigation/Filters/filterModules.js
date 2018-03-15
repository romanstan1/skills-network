import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';


export const AllFilter = ({filters, handleFilterClick}) => filters.map(filter =>
  <IndividualPersonFilter filter={filter} key={filter.name} handleFilterClick={handleFilterClick}/>
)

export const IndividualPersonFilter = ({filter, handleFilterClick}) =>
<div
  key={filter.name}
  className={
    filter.active ?
      filter.connectionFilterActive ?
      'single-filter active people connectionFilterActive' : 'single-filter active people'
    :'single-filter people'
    }
  onClick={()=>handleFilterClick(filter.name)} >
  <h4>{humanize(filter.name)}</h4>
  <span></span>
</div>


export const TriggerSibling = ({groupFilter, subGroup, handleSubGroupSelect}) =>
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
        <TriggerSibling
          groupFilter={clientFilter}
          subGroup={clientFilter.client}
          handleSubGroupSelect={handleSubGroupSelect}/>
      }
      transitionTime={100}
      trigger={humanize(clientFilter.client)}>
      {
        clientFilter.people.map((filter,i) =>
        <IndividualPersonFilter key={i} filter={filter} handleFilterClick={handleFilterClick}/>)
      }
    </Collapsible>
  </span>)
}

export const LocationFilter = ({filters, handleFilterClick, uniqueLocations, handleSubGroupSelect}) => {

  const locationFilters =  uniqueLocations.map(uniqueLocation => {
    return {location: uniqueLocation,people: filters.filter(person => person.location === uniqueLocation)}
  })
  return locationFilters.map(locationFilter =>
  <span key={locationFilter.location}>
    <Collapsible
      className='sub-group' openedClassName='sub-group'
      triggerSibling={() =>
        <TriggerSibling
          groupFilter={locationFilter}
          subGroup={locationFilter.location}
          handleSubGroupSelect={handleSubGroupSelect}/>
      }
      transitionTime={100}
      trigger={humanize(locationFilter.location)}>
      {
        locationFilter.people.map((filter,i) =>
        <IndividualPersonFilter key={i} filter={filter} handleFilterClick={handleFilterClick}/>)
      }
    </Collapsible>
  </span>)
}
