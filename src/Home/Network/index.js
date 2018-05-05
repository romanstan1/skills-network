import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {render} from './d3/network_functions.js'
import Tooltip from './Tooltip'
import FullDetails from './FullDetails'
import FullScreenIcon from './FullScreenIcon'
import {render, update} from './D3_modules'
import constructLinks from './constructLinks'
import SelectDimension from './SelectDimension'
import ThreeDNetwork from './ThreeDNetwork'
import TwoDNetwork from './TwoDNetwork'

class Network extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateScreenDimensions);
    // const {nodes, links} = this.constructForceNetwork(this.props)
    // this.setState({nodes, links})
    // render(nodes, links)
  }

  updateScreenDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }

  render() {
    const {width, height} = this.state
    return [
      // <svg key='svg'></svg>,
      // <canvas key='canvas' ref="canvas" style={{width:'100%', height:'100%'}}/>,

      <Tooltip key='tooltip'/>,
      <FullDetails key='fulldetails'/>,
      // <div id='3d-graph' ref="3d-graph" key='3d-graph'
      //   // style={{width:'100%', height:'100%'}}
      // />,
      <div id='threedGraph' key='3d'>
        {
          this.props.dimension === '3D'?
          <ThreeDNetwork
            width={width}
            height={height}
            // props={this.state}
          />
          :
          <TwoDNetwork
            props={this.state}
          />
        }
      </div>,
      <FullScreenIcon key='fullscreenicon'/>,
      <SelectDimension key='selectdimension'/>
    ]
  }
}

export default connect(state => ({
  people: state.data.people.filters.filter(person => person.active && !person.connectionFilterActive),
  skills: state.data.skills.filters.filter(skill => skill.active),
  connections: state.data.connections,
  dimension: state.data.dimension
}))(Network)
