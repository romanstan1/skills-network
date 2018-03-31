import React from 'react'
import Collapsible from 'react-collapsible'
import humanize from 'string-humanize'
import {connect} from 'react-redux'
import {toggleSelectAllFilter} from 'store/modules/actions'

const Trigger = connect()(({parentName, active, dispatch}) =>
  <div
    onClick={()=> dispatch(toggleSelectAllFilter(parentName)) }
    className={active?`select-all active ${parentName}`:`select-all ${parentName}`}
    >
      <span></span>
  </div>)

const collapsibleHOC = FilterGroup => ({parentName, active, ...props}) =>
  <Collapsible
    transitionTime={100} trigger={humanize(parentName)}
    triggerSibling={() => <Trigger parentName={parentName} active={active} /> }
    >
     <FilterGroup {...props}/>
  </Collapsible>


export default collapsibleHOC
