import React, {Component} from 'react';
import {render, update} from './D3_modules'
import {connect} from 'react-redux'

class TwoDNetwork extends Component {

  componentDidMount() {
    const {nodes, links, width, height} = this.props
    render(width, height)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links, width, height} = nextProps
    update(nodes, links)
  }

  render() {
    const {width, height} = this.props
    return (
      <div id='twod-graph' ref="twod-graph" key='twod-graph'
        style={{width, height}}
      />
    )
  }
}
// {/* <svg style={{width: width - 260, height}} key='svg'></svg> */}

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(TwoDNetwork)
