import React from 'react';
import humanize from 'string-humanize'
import {IndividualPersonFilter} from './filterModules'

const SkillsFilters = ({parent, handleFilterClick}) => {
  return parent.filters.map(filter =>
    <div
      key={filter.name}
      className={filter.active ? 'single-filter active skills':'single-filter skills'}
      onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
      <h4>{humanize(filter.name)}</h4>
      <span></span>
    </div>
  )
}

export default SkillsFilters
