import React, {Component} from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  grid-column: 3 / 4;
  padding-left: 20px;
`

export default class View extends Component {
  render() {
    return (
      <Wrapper>Toggle</Wrapper>
    )
  }
}
