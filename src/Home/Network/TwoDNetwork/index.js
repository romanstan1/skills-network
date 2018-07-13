import React, {Component} from 'react';
// import {render2, update2} from './D3_modules'
import {render2, update2} from './D3_modules_rewrite'
import {connect} from 'react-redux'

class TwoDNetwork extends Component {

  componentDidMount() {
    const {nodes, links, width, height} = this.props
    // render3(width, height)
    render2(nodes, links, width, height)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links, width, height} = nextProps
    // update(nodes, links)
    update2(nodes, links, width, height)
  }

  render() {
    const {width, height} = this.props
    return (
      // <div id='twod-graph' ref="twod-graph" key='twod-graph'
      //   style={{width, height}}
      // />
      <svg style={{width: width - 260, height}} key='svg'></svg>
    )
  }
}

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(TwoDNetwork)
