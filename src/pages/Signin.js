import React, {Component} from "react"
import {auth, persistence} from "firebase/initialize"
import {CtaButton, Card} from "ui"
import styled from "styled-components"
import {Link} from "react-router-dom"

const Wrapper = styled.div`
  
`

export default class SignIn extends Component {
  state = {
    email: "",
    password: ""
  }
  handleChange = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  handleSignIn = () => {
    const {email, password} = this.state
    auth.setPersistence(persistence.LOCAL)
      .then(() =>
        auth.signInWithEmailAndPassword(email, password))
      .then((firebaseUser) => {
        console.log("firebaseUser: ", auth.currentUser, persistence.SESSION)
      })
      .catch((error) => {
        console.log("error: ", error)
        // this.props.errorMessage(error))
      })
  }

  render() {
    console.log("------------- sign in component!!!")

    return (
      <Wrapper>
        <Card>
          <label htmlFor="">Email</label>
          <input data-type="email" type="text" onChange={this.handleChange} />
          <br />
          <br />
          <label htmlFor="">Password</label>
          <input data-type="password" type="password" onChange={this.handleChange} />
          <CtaButton
            onClick={this.handleSignIn}
            text="sign in" />
          <Link to="/sign-up">
              Sign up
          </Link>

        </Card>
      </Wrapper>
    )
  }
}
