import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import D3ForceNetwork from "components/D3ForceNetwork"
import Tooltip from "./Tooltip"
import FullDetails from "./FullDetails"
import FullScreenIcon from "./FullScreenIcon"

class Network extends Component {
  render() {
    const {width, height} = this.props
    return [
      <Tooltip key="tooltip" />,
      <FullDetails key="fulldetails" />,
      <div id="graph-wrapper" key="graph-wrapper">
        <D3ForceNetwork
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
  width: state.data.width,
  height: state.data.height
})

export default connect(mapState)(Network)
