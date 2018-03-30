import React, { Component } from 'react'
import humanize from 'string-humanize'
import {connect} from 'react-redux'
import {toggleFilter} from '../../../../store/modules/actions'

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
      <h4>{parentName ==='connections'? humanize(filter.name) : filter.name}</h4>
      <span></span>
    </div>
}

export default connect()(SingleFilter)




// onClick={()=>handleFilterClick(filter.name, parentName)}

// className={filter.active ? `single-filter active ${parentName}`:`single-filter ${parentName}`}


// export const IndividualPersonFilter = ({filter, handleFilterClick}) =>
// <div
//   // key={filter.name}
//   className={
//     filter.active ?
//       filter.connectionFilterActive ?
//       'single-filter active people connectionFilterActive' : 'single-filter active people'
//     :'single-filter people'
//     }
//   onClick={()=>handleFilterClick(filter.name)} >
//   <h4>{humanize(filter.name)}</h4>
//   <span></span>
// </div>
