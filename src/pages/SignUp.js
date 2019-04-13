import React, {Component} from "react"
import {auth, persistence} from "firebase/initialize"
import {CtaButton, Card} from "ui"
import styled from "styled-components"
import {Link} from "react-router-dom"

const Wrapper = styled.div`
  
`

export default class SignUp extends Component {
  state = {
    email: "",
    password: ""
  }
  handleChange = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  handleSignUp = () => {
  }

  render() {
    return (
      <Wrapper>
        <Card>
          Sign Up

          <Link to="/sign-in">
              Sign in
          </Link>

        </Card>
      </Wrapper>
    )
  }
}
