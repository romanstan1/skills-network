import React from 'react'
import humanize from 'string-humanize'
import {connect} from 'react-redux'
import {toggleFilter} from 'store/modules/actions'

const SingleFilter = ({filter, parentName, dispatch}) => {
  const handleClick = () => {
    dispatch(toggleFilter(filter.name, parentName))
  }
  return <div
    className={
      filter.active ?
      filter.connectionFilterActive ?
      `single-filter active ${parentName} connectionFilterActive`
      : `single-filter active ${parentName}`
      :`single-filter people`
    }
    onClick={handleClick}
    >
      <h4>{parentName === 'connections'? humanize(filter.name) : filter.name}</h4>
      <span></span>
    </div>
}

export default connect()(SingleFilter)
