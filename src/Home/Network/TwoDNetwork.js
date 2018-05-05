import React, {Component} from 'react';


export default class TwoDNetwork extends Component {

  render() {
    const {width, height} = this.props
    return (
      <div
        id='3d-graph' ref="3d-graph" key='3d-graph'
        style={{width, height}}
      />
    )
  }
}
