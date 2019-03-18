import React from "react"
import humanize from "string-humanize"
import {connect} from "react-redux"
import {toggleFilter} from "store/actions/visualise"
import PropTypes from "prop-types"

function getClassName(filter, parentName) {
  if (!filter.active) return "single-filter people"
  else if (filter.connectionFilterActive) return `single-filter active ${parentName} connectionFilterActive`
  else return `single-filter active ${parentName}`
}

const SingleFilter = ({filter, parentName, dispatch}) => {
  const className = getClassName(filter, parentName)
  const handleClick = () => dispatch(toggleFilter(filter.name, parentName))
  return (
    <div
      className={className}
      onClick={handleClick}>
      <h4>{parentName === "connections" ? humanize(filter.name) : filter.name}</h4>
      <span />
    </div>
  )
}

SingleFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  parentName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(SingleFilter)
