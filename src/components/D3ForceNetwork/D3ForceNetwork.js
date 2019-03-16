import React, {Component, Fragment} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {render, update} from "./D3_core"

class D3ForceNetwork extends Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }
  componentDidMount() {
    const {nodes, links, width, height} = this.props
    render(nodes, links, width, height)
  }

  componentWillReceiveProps(nextProps) {
    const {nodes, links, width, height} = nextProps
    update(nodes, links, width, height)
  }

  render() {
    const {width, height} = this.props
    return (
      <Fragment>
        <canvas
          style={{width, height}}
          width={width}
          height={height} />
        <svg
          style={{width, height}} />
      </Fragment>
    )
  }
}

export default connect((state) => ({
  links: state.data.links,
  nodes: state.data.nodes
}))(D3ForceNetwork)
