import React from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import {TextFilter} from 'react-text-filter';
import Filters from '../index'
import SingleFilter from './SingleFilter'
import searchHOC from './searchHOC'

export const AllFilters = searchHOC(({filters}) =>
  <span> { filters.map(filter =>
    <SingleFilter key={filter.name} filter={filter} parentName='people'/> )
  } </span>)

export const PeopleTriggerSibling = ({groupFilter, subGroup, handleSubGroupSelect}) =>
  <div
    onClick={()=>handleSubGroupSelect(subGroup)}
    className={
      !groupFilter.people.map(filter => filter.active).includes(false)?
      'select-all sub-group active people':'select-all sub-group people'}>
    <span></span>
  </div>

export const GroupFilters = ({filters, uniques, handleSubGroupSelect, groupBy}) => {

  const groups = uniques.map(unique => (
     {
       unique, people: filters.filter(person =>
       groupBy === 'client'? person.client === unique :
       person.location === unique
     )}
  ))

  return groups.map(group =>
    <span key={group.unique}>
      <Collapsible
        className='sub-group' openedClassName='sub-group'
        triggerSibling={() =>
          <PeopleTriggerSibling
            groupFilter={group}
            subGroup={group.unique}
            handleSubGroupSelect={handleSubGroupSelect}
          />
        }
        transitionTime={100}
        trigger={humanize(group.unique)}
      >
        {
          group.people.map(filter =>
            <SingleFilter key={filter.name} filter={filter} parentName='people'/>)
        }
      </Collapsible>
    </span>
  )
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
