import React, { Component } from 'react';
import {toggleFullScreen} from './d3/network_modules'

export default class FullScreenIcon extends Component {
  handleFullScreen = () => {
    toggleFullScreen()
  }
  render() {
    return (
      <div
        onClick={this.handleFullScreen}
        className='full-screen-icon'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }
}
