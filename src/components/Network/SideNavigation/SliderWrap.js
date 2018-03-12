import React, { Component } from 'react';
import {connect} from 'react-redux';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {changeMinConnections} from '../../../store/modules/actions'
import {applyFilter} from '../d3/network_functions.js'


class SliderWrap extends Component {
  handleChange = (value) => {
    this.props.dispatch(changeMinConnections(value))
    applyFilter()
  }
  render () {
    const {minConnections} = this.props
    return (
      <div className='slider-wrap'>
        <span className={minConnections > 0?'title active': 'title'}>Minimum No.</span>
        <Slider
          onChange={this.handleChange}
          step={1}
          marks={{0: '0',1: '1',2: '2',3: '3'}}
          min={0}
          max={3}
        />
      </div>
    )
  }
}

export default connect(state => ({
  minConnections: state.data.allFilters[0].minConnections
}))(SliderWrap)
