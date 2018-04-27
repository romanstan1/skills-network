import React from 'react';
import {connect} from 'react-redux'
import {changeDimension} from 'store/modules/actions'

const SelectDimension = ({dimension, dispatch}) => {

  const handleDimension = () => {
    dispatch(changeDimension())
  }

  return (
    <div onClick={handleDimension} className='dimension'>
      {dimension}
    </div>
  )
}

export default connect(state => ({
  dimension: state.data.dimension
}))(SelectDimension)
