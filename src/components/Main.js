import React, { Component } from 'react';
import {connect} from 'react-redux'
import Network from './Network/Network.js'
// import {init, stop} from './background/background.js'
// import {selectChapter} from '../../store/modules/actions'


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
