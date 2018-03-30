import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import humanize from 'string-humanize'

const TriggerSibling = ({parentName, active}) =>
  <div
    onClick={()=>TriggerSibling.handleSelectAllClick(parentName)}
    className={active?`select-all active ${parentName}`:`select-all ${parentName}`}
    >
      <span></span>
  </div>


TriggerSibling.handleSelectAllClick = (parentName) => {
  console.log('parentName: ', parentName)
  // this.props.dispatch(toggleSelectAllFilter(parentName))
  // applyFilter()
}

const CollapsibleHOC = FilterGroup => ({parentName, active, ...props}) => {
  return <Collapsible
    transitionTime={100}
    trigger={humanize(parentName)}
    triggerSibling={() =>
      <TriggerSibling
        parentName={parentName}
        active={active}
      />
      }
    >
     <FilterGroup {...props}/>
  </Collapsible>}


export default CollapsibleHOC
