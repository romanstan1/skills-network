import React, { Component } from 'react';
import humanize from 'string-humanize'
import PeopleFilters from './PeopleFilters'
import SkillsFilters from './SkillsFilters'
import ConnectionFilters from './ConnectionFilters'
import Collapsible from 'react-collapsible';

// this should be a container component?
const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>
        <Collapsible
          triggerSibling={() =>
            <div
              onClick={()=>handleSelectAllClick(parent.parentName)}
              className={parent.active?'select-all active':'select-all'}>
              <span></span>
            </div>
          }
          transitionTime={100}
          trigger={humanize(parent.parentName)}>
          { parent.parentName === 'connections'?
            <ConnectionFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }
          { parent.parentName === 'people'?
            <PeopleFilters /> :null
          }
          { parent.parentName === 'skills'?
            <SkillsFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }
        </Collapsible>
      </span>
    ))
  }
</section>

export default Filters
