import React, {Component} from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: inline-block;
  background: grey;
  text-align: center;
  color: white;
  text-transform: uppercase;
  line-height: 20px;
  padding: 10px 20px;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.1s ease-out;
  &:hover {
    opacity: 0.9;
    transform: scale(1.03, 1.03)
  }
`

export default class CtaButton extends Component {
  render() {
    const {text, onClick} = this.props
    return (
      <Wrapper onClick={onClick}>{text}</Wrapper>
    )
  }
}
