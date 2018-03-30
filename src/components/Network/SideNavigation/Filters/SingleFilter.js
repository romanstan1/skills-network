import React, { Component } from 'react'
import humanize from 'string-humanize'
import {connect} from 'react-redux'
import {toggleFilter} from '../../../../store/modules/actions'

const SingleFilter = ({filter, parentName, dispatch}) =>
  <div
    className={filter.active ? `single-filter active ${parentName}`:`single-filter ${parentName}`}
    onClick={()=>dispatch(toggleFilter(filter.name, parentName))}
  >
    <h4>{humanize(filter.name)}</h4>
    <span></span>
  </div>

  // onClick={()=>handleFilterClick(filter.name, parentName)}

export default connect()(SingleFilter)
