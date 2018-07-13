import React, { Component } from 'react';

let fullscreen = false
function toggleFullScreen() {
  if (document.documentElement.webkitRequestFullscreen && !fullscreen) {
    document.documentElement.webkitRequestFullscreen()
    fullscreen = true
  }
  else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
    fullscreen = false
  }
}

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
