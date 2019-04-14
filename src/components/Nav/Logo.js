import React, {Component} from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  background: #f9fafc;
  grid-column: 1 / 2;
  padding-left: 30px;
`

export default class Logo extends Component {
  render() {
    return (
      <Wrapper>Sensery</Wrapper>
    )
  }
}
