import React, { Component } from 'react';
import humanize from 'string-humanize'

const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>
        <div className='parent-name'>
          <h3>{humanize(parent.parentName)}</h3>
          <div
            onClick={()=>handleSelectAllClick(parent.parentName)}
            className={parent.active?'active':null}>
            <span></span>
          </div>
        </div>
        {
          parent.filters.map(filter =>
            <div
              key={filter.name}
              className={filter.active ? 'single-filter active':'single-filter'}
              onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
              <h4>{humanize(filter.name)}</h4>
              <span></span>
            </div>
          )
        }
      </span>
    ))
  }
</section>

export default Filters
