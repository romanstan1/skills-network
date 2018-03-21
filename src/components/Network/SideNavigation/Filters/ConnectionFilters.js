import React from 'react';
import humanize from 'string-humanize'
import SliderWrap from './SliderWrap'

const ConnectionFilters = ({connections, handleFilterClick}) =>
  <span>
    <SingleConnectionFilter
      filter={connections.filters[0]}
      handleFilterClick={handleFilterClick}
    />
    <SliderWrap/>
    <SingleConnectionFilter
      filter={connections.filters[1]}
      handleFilterClick={handleFilterClick}
    />
  </span>

const SingleConnectionFilter = ({filter, handleFilterClick}) =>
  <div
    className={filter.active ? 'single-filter active connections':'single-filter connections'}
    onClick={()=>handleFilterClick(filter.name, 'connections')} >
    <h4>{humanize(filter.name)}</h4>
    <span></span>
  </div>

export default ConnectionFilters
