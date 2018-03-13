import React from 'react';
import humanize from 'string-humanize'

const SkillsFilters = ({parent, handleFilterClick}) => {
  return parent.filters.map(filter =>
    <div
      key={filter.name}
      className={filter.active ? 'single-filter active':'single-filter'}
      onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
      <h4>{humanize(filter.name)}</h4>
      <span></span>
    </div>
  )
}

export default SkillsFilters
