import React, {Component, Fragment} from 'react';
// import {render2, update2} from './D3_modules'
import {render2, update2} from './D3_core'
import {connect} from 'react-redux'

class TwoDNetwork extends Component {

  componentDidMount() {
    const {nodes, links, width, height} = this.props
    // render3(width, height)
    console.log("width", width)
    render2(nodes, links, width , height)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links, width, height} = nextProps
    // update(nodes, links)
    update2(nodes, links, width , height)
  }

  render() {
    const {width, height} = this.props
    return (
      <Fragment>
        <canvas style={{width: width, height}} width={width} height={height}/>
        <svg style={{width: width, height}}/>
      </Fragment>
    )
  }
}

export default connect(state => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(TwoDNetwork)
