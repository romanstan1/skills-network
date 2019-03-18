import React, {Component} from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  grid-column: 4 / 5;
`

export default class User extends Component {
  render() {
    return (
      <Wrapper>User</Wrapper>
    )
  }
}
