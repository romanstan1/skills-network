import React, {Component} from "react"
import styled from "styled-components"
import {auth} from "firebase/initialize"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {logOut} from "store/actions/auth"

const Wrapper = styled.div`
  grid-column: 4 / 5;
`

class User extends Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired
  }
  signOut = () => {
    auth.signOut()
      .then(() => {
        console.log("signout success")
        // this.props.logOut()
      })
      .catch((error) => {
        console.log("Sign-out error:", error)
      })
  }
  render() {
    return (
      <Wrapper onClick={this.signOut}>User</Wrapper>
    )
  }
}

const mapDispatch = {
  logOut
}

export default connect(null, mapDispatch)(User)
