import React, {Component} from "react"
import {createUser} from "firebase/modules"
import {CtaButton, Card, Link, Input} from "ui"
import styled from "styled-components"

const Wrapper = styled.div` 
`

export default class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirmed: "",
    firstName: "",
    lastName: ""
  }

  handleChange = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  handleSignUp = () => {
    createUser(this.state)
      .then((res) => {
        console.log("SUCCESS!!!", res)
      })
      .catch((error) => {
        console.log("error in create user logged here:: ", error)
      })
  }

  render() {
    return (
      <Wrapper>
        <Card>
          <Input
            label="First name"
            dataType="firstName"
            type="text"
            onChange={this.handleChange} />
          <Input
            label="Last name"
            dataType="lastName"
            type="text"
            onChange={this.handleChange} />
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
          <Input
            label="Confirm password"
            dataType="confirmPassword"
            type="password"
            onChange={this.handleChange} />
          <br />
          <CtaButton
            onClick={this.handleSignUp}
            text="Sign Up" />
          <br />
          <Link to="/sign-in">
            Sign in
          </Link>
        </Card>
      </Wrapper>
    )
  }
}
