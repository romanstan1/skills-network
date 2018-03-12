import React, { Component } from 'react';
import {connect} from 'react-redux'
import Network from './Network/Network.js'

class Main extends Component {
  render() {
    return (
      <div id='main'>
        <Network/>
      </div>
    )
  }
}

export default connect(state => ({
}))(Main)
