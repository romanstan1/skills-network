import React, {Component, Fragment} from 'react';
import {render2, update2} from './D3_core'
import {connect} from 'react-redux'

class TwoDNetwork extends Component {

  componentDidMount() {
    const {nodes, links, width, height} = this.props
    render2(nodes, links, width , height)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links, width, height} = nextProps
    update2(nodes, links, width , height)
  }

  render() {
    const {width, height} = this.props
    return (
      <Fragment>
        <canvas
          style={{width, height}}
          width={width}
          height={height}
        />
        <svg
          style={{width, height}}
        />
      </Fragment>
    )
  }
}

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(TwoDNetwork)
