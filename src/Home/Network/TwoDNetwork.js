import React, {Component} from 'react';
import {render, update} from './D3_modules'


export default class TwoDNetwork extends Component {

  // componentDidMount() {
  //   // const {nodes, links} = this.props
  //   const {nodes, links, width, height} = this.props.props
  //   render(nodes, links)
  // }

  // componentWillReceiveProps(nextProps) {
  //   const {nodes, links} = nextProps.props
  //   console.log("TwoDNetwork did receive props", nodes, links)
  //   update(nodes, links)
  // }

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
