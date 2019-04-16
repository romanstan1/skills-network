import React, {Component} from "react"
import {auth, persistence, firestore} from "firebase/initialize"
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
    const {email, password} = this.state
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("successful signup: ", user)
        this.uploadUserData(user)
      })
      .catch((error) => {
        console.log("error signup: ", error)
      })
  }

  uploadUserData = (firebaseUser) => {
    const {email, firstName, lastName} = this.state
    const docRef = firestore.collection("users").doc(firebaseUser.user.uid)
    docRef.set({
      email,
      firstName,
      lastName
    })
      .catch((error) => console.log("Error on user upload::", error))
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
