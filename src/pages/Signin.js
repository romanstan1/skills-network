import React, {Component} from "react"
import {signIn} from "firebase/modules"

import {CtaButton, Card, Link, Input} from "ui"
import styled from "styled-components"

const Wrapper = styled.div``

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  }
  handleChange = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  handleSignIn = () => {
    signIn(this.state)
      .then((res) => {
        console.log("handleSignIn success:", res)
      })
      .catch((error) => {
        console.log("handleSignIn error:", error)
      })
  }

  render() {
    return (
      <Wrapper>
        <Card>
          <Input
            label="Email"
            dataType="email"
            type="text"
            onChange={this.handleChange} />
          <Input
            label="Password"
            dataType="password"
            type="password"
            onChange={this.handleChange} />
          <CtaButton
            onClick={this.handleSignIn}
            text="sign in" />
          <br />
          <Link to="/sign-up">
            Create an account
          </Link>
        </Card>
      </Wrapper>
    )
  }
}

export default SignIn
