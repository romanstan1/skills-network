import React, { Component } from 'react';
import humanize from 'string-humanize'
import CollapsibleParent from './CollapsibleParent'
import PeopleFilters from './PeopleFilters'
import SkillsFilters from './SkillsFilters'
import ConnectionFilters from './ConnectionFilters'

// this should be a container component, combine with collapsible parent
const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>

        <CollapsibleParent
          parent={parent}
          handleSelectAllClick={handleSelectAllClick}
          trigger={humanize(parent.parentName)}>

          { parent.parentName === 'connections'?
            <ConnectionFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }
          { parent.parentName === 'people'?
            <PeopleFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }
          { parent.parentName === 'skills'?
            <SkillsFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }

        </CollapsibleParent>
      </span>
    ))
  }
</section>

export default Filters
