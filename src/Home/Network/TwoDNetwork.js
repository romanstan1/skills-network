import React, {Component} from 'react';
import {render, update} from './D3_modules'
import {connect} from 'react-redux'


class TwoDNetwork extends Component {

  componentDidMount() {
    // const {nodes, links} = this.props
    const {nodes, links} = this.props
    console.log("componentDidMount",nodes, links)
    render(nodes, links)

  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links} = nextProps
    // update(nodes, links)
  }

  render() {
    const {width, height} = this.props
    return (
      // <div
      //   id='3d-graph' ref="3d-graph" key='3d-graph'
      //   style={{width, height}}
      // />
      <svg style={{width, height}} key='svg'></svg>
    )
  }
}

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(TwoDNetwork)
