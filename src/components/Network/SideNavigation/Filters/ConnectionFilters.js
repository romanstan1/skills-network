import React from 'react';
import humanize from 'string-humanize'
import SliderWrap from './SliderWrap'
import {SingleFilter} from './filterModules'

const ConnectionFilters = ({connections, handleFilterClick}) =>
  <span>
    <SingleFilter
      filter={connections.filters[0]}
      handleFilterClick={handleFilterClick}
      parentName='connections'
    />
    <SliderWrap/>
    <SingleFilter
      filter={connections.filters[1]}
      handleFilterClick={handleFilterClick}
      parentName='connections'
    />
  </span>

export default ConnectionFilters
