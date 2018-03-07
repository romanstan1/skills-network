import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {init, stop} from './background/background.js'
// import {selectChapter} from '../../store/modules/actions'


class Main extends Component {
  render() {
    return (
      <div>
        Main Content
      </div>
    )
  }
}

export default connect(state => ({
}))(Main)
