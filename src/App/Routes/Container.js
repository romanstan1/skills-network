import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {logInSuccessful, notLoggedIn, updateUserData, updateProjectNames} from "store/actions/auth"
import {authStateChange} from "firebase/modules"

import {Authenticated, NonAuthenticated, Loading} from "./routes"

class Container extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    authPending: PropTypes.bool.isRequired,
    logInSuccessful: PropTypes.func.isRequired,
    notLoggedIn: PropTypes.func.isRequired
  }
  componentDidMount() {
    authStateChange(this.props)
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
  notLoggedIn,
  updateUserData,
  updateProjectNames
}

export default connect(mapProps, mapDispatch)(Container)
