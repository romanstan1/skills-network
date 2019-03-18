import React, {Component} from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import ProjectSelection from "./ProjectSelection"
import Logo from "./Logo"
import View from "./View"
import User from "./User"

const StyledNav = styled.nav`
  background: ghostwhite;
  display: grid;
  height: 48px;
  align-items: center;
  grid-template-columns: 200px auto 200px 200px;
  /* background: ${({theme}) => theme.color}; */
`

class Nav extends Component {
  render() {
    return (
      <StyledNav>
        <Logo />
        <ProjectSelection />
        <View />
        <User />
      </StyledNav>
    )
  }
}

const mapState = () => ({})

export default connect(mapState)(Nav)
