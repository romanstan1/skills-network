import React, {Component} from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.08), 0 10px 30px 0 rgba(0,0,0,0.1);
  border-radius: 15px;
  background: ghostwhite;
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  align-items: center;
  width: ${({width}) => `${width}px`};
`

export default class Card extends Component {
  static propTypes = {
    width: PropTypes.number,
    children: PropTypes.node.isRequired
  }
 static defaultProps = {
   width: 400
 }
 render() {
   const {children, width} = this.props
   return (
     <Wrapper width={width}>{children}</Wrapper>
   )
 }
}
