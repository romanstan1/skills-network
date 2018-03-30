import React from 'react';
import SliderWrap from './SliderWrap'
import SingleFilter from './SingleFilter'
import { connect } from 'react-redux'
import collapsibleHOC from './collapsibleHOC'

const ConnectionFilters = ({connections}) =>
  <span>
    <SingleFilter
      filter={connections.filters[0]}
      parentName='connections'
    />
    <SliderWrap/>
    <SingleFilter
      filter={connections.filters[1]}
      parentName='connections'
    />
  </span>

export default connect(state => ({
  connections: state.data.connections
}))(collapsibleHOC(ConnectionFilters))
