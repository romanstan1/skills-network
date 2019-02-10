import React from "react"
import {connect} from "react-redux"
import {changeDimension} from "store/modules/actions"
import PropTypes from "prop-types"

const SelectDimension = ({dimension, dispatch}) => {
  const handleDimension = () => dispatch(changeDimension())

  return (
    <div onClick={handleDimension} className="dimension">
      {dimension}
    </div>
  )
}

SelectDimension.propTypes = {
  dimension: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state) => ({
  dimension: state.data.dimension
}))(SelectDimension)
