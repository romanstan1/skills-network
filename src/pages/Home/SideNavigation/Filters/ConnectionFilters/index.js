import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import SliderWrap from "./SliderWrap"
import SingleFilter from "../SingleFilter"
import collapsibleHOC from "../collapsibleHOC"

const ConnectionFilters = ({connections}) =>
  <span>
    <SingleFilter
      filter={connections.filters[0]}
      parentName="connections" />
    <SliderWrap />
    <SingleFilter
      filter={connections.filters[1]}
      parentName="connections" />
  </span>

ConnectionFilters.propTypes = {
  connections: PropTypes.object.isRequired
}

export default connect((state) => ({
  connections: state.data.connections
}))(collapsibleHOC(ConnectionFilters))
