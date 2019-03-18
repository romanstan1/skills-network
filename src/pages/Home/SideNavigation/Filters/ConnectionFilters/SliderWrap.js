import React from "react"
import {connect} from "react-redux"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import {changeMinConnections} from "store/actions/visualise"
import PropTypes from "prop-types"

const SliderWrap = ({minConnections, dispatch}) => {
  const handleChange = (value) => dispatch(changeMinConnections(value))
  return (
    <div className="slider-wrap">
      <span className={minConnections > 0 ? "title active" : "title"}>Min. No.</span>
      <Slider
        onChange={handleChange}
        step={1}
        marks={{0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5"}}
        min={0}
        max={5} />
    </div>
  )
}

const mapState = (state) => ({
  minConnections: state.data.people.minConnections
})

SliderWrap.propTypes = {
  minConnections: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapState)(SliderWrap)
