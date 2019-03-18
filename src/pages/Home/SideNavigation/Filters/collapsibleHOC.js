import React from "react"
import Collapsible from "react-collapsible"
import humanize from "string-humanize"
import {connect} from "react-redux"
import {toggleSelectAllFilter} from "store/actions/visualise"
import PropTypes from "prop-types"

const Trigger = connect()(({parentName, active, dispatch}) => {
  return <div
    onClick={() => dispatch(toggleSelectAllFilter(parentName))}
    className={active ? `select-all active ${parentName}` : `select-all ${parentName}`}>
    <span />
  </div>
})

const collapsibleHOC = (FilterGroup) => {
  const Comp = ({parentName, active, ...props}) =>
    <Collapsible
      open={parentName === "connections"}
      transitionTime={100}
      trigger={humanize(parentName)}
      triggerSibling={() => <Trigger parentName={parentName} active={active} />}>
      <FilterGroup {...props} />
    </Collapsible>

  Comp.propTypes = {
    parentName: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  }

  return Comp
}

collapsibleHOC.propTypes = {
  FilterGroup: PropTypes.element.isRequired
}

export default collapsibleHOC
