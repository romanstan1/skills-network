import React, {Component} from "react"
import {auth, persistence, firestore} from "firebase/initialize"
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
    const {email, password} = this.state
    console.log("email, password: ", email, password)
    auth.setPersistence(persistence.LOCAL)
      .then(() =>
        auth.signInWithEmailAndPassword(email, password))
      .then((firebaseUser) => {
        console.log("signing in success: ", firebaseUser)
        // this.uploadUserData(email, firebaseUser)
      })
      .catch((error) => {
        console.log("Error siging in: ", error)
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
