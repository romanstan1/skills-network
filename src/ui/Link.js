import React, {Component} from "react"
import {push} from "connected-react-router"
import {connect} from "react-redux"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }
  handleClick = () => {
    const {push: pushTo, to} = this.props
    pushTo(to)
  }

  render() {
    return (
      <Wrapper onClick={this.handleClick}>
        {this.props.children}
      </Wrapper>
    )
  }
}

const mapDispatch = {
  push
}

export default connect(null, mapDispatch)(Link)
