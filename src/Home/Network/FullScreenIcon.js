import React, {Component} from "react"

export default class FullScreenIcon extends Component {
  state = {
    fullscreen: false
  }
  toggleFullScreen = () => {
    if (document.documentElement.webkitRequestFullscreen && !this.state.fullscreen) {
      document.documentElement.webkitRequestFullscreen()
      this.setState({fullscreen: true})
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
      this.setState({fullscreen: false})
    }
  }
  render() {
    return (
      <div
        onClick={this.toggleFullScreen}
        className="full-screen-icon">
        <span />
        <span />
        <span />
        <span />
      </div>
    )
  }
}
