import React, {Component} from "react"
import {connect} from "react-redux"
import {auth} from "firebase/initialize"
import PropTypes from "prop-types"
import {logInSuccessful, notLoggedIn} from "store/actions/auth"
import {Authenticated, NonAuthenticated, Loading} from "./routes"

class Container extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    authPending: PropTypes.bool.isRequired,
    logInSuccessful: PropTypes.func.isRequired,
    notLoggedIn: PropTypes.func.isRequired
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.logInSuccessful(user)
        console.log("Logged in, email", user.email)
      } else {
        this.props.notLoggedIn()
        console.log("Logged out")
      }
    })
  }
  render() {
    const {isAuthenticated, authPending} = this.props
    if (authPending) return <Loading />
    return (
      <div>
        {
          isAuthenticated ?
            <Authenticated /> : <NonAuthenticated />
        }
      </div>
    )
  }
}

const mapProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authPending: state.auth.authPending
})

const mapDispatch = {
  logInSuccessful,
  notLoggedIn
}

export default connect(mapProps, mapDispatch)(Container)
