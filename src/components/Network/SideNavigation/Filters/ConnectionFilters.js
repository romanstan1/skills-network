import React from 'react';
import humanize from 'string-humanize'
import SliderWrap from './SliderWrap'

const ConnectionFilters = ({parent, handleFilterClick}) => <span>
  <div
    className={parent.filters[0].active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(parent.filters[0].name, parent.parentName)} >
    <h4>{humanize('current_skills')}</h4>
    <span></span>
  </div>
  <SliderWrap/>
  <div
    className={parent.filters[1].active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(parent.filters[1].name, parent.parentName)} >
    <h4>{humanize('desired_skills')}</h4>
    <span></span>
  </div>
</span>

export default ConnectionFilters
