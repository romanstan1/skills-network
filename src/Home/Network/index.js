import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Tooltip from "./Tooltip"
import FullDetails from "./FullDetails"
import FullScreenIcon from "./FullScreenIcon"
import TwoDNetwork from "./TwoDNetwork"

class Network extends Component {
  render() {
    const {width, height} = this.props
    return [
      <Tooltip key="tooltip" />,
      <FullDetails key="fulldetails" />,
      <div id="graph-wrapper" key="graph-wrapper">
        <TwoDNetwork
          width={width}
          height={height} />
      </div>,
      <FullScreenIcon key="fullscreenicon" />
    ]
  }
}

Network.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

const mapState = (state) => ({
  connections: state.data.connections,
  dimension: state.data.dimension,
  width: state.data.width,
  height: state.data.height
})

export default connect(mapState)(Network)
