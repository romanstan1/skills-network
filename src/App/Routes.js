import React, {Component, Fragment} from "react"
import {Route, Router, Redirect, Switch} from "react-router-dom"
import {connect} from "react-redux"
import Home from "pages/Home"
import history from "store"
import PropTypes from "prop-types"


const Authenticated = () =>
  <Fragment>
    <Switch>
      {/* <Route exact path="/sign-in" render={() => <Redirect to="/" />} />
      <Route path="/update-location" component={Inputs} />
      <Route path="/add-location" component={Inputs} />
      <Route path="/delete-location" component={DeleteInput} />
      <Route path="/send-notification" component={SendNotification} />
      <Route path="/download-data" component={DownloadData} /> */}
      <Route exact path="/" component={Home} />
      {/* <Route path="/:location" component={Main} />
      <Route path="/:location/:date" component={Main} /> */}
      <Redirect to="/" />
    </Switch>
  </Fragment>

const NonAuthenticated = () =>
  <Fragment>
    <Switch>
      {/* <Route exact path="/send-email" component={SendEmail} />
      <Route exact path="/sign-in" component={SignIn} /> */}
      <Redirect to="/sign-in" />
    </Switch>
  </Fragment>

const Loading = () =>
  <div className="loading-screen">
    log in pending
  </div>

class Routes extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logInPending: PropTypes.bool.isRequired
  }

  componentDidMount() {
    // onAuthStateChanged(this.props.logInSuccessful, this.props.notLoggedIn)
    // registerServiceWorker()
    // registerDeviceForNotifications()
  }

  renderLoginPending = () => {
    if (this.props.logInPending) {
      return (
        <div className="loading-screen">
          log in pending
        </div>)
    }
    return null
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          {
            this.props.logInPending ?
              <Fragment>
                <Authenticated />
                <NonAuthenticated />
              </Fragment> :
              <Loading />
          }
        </Fragment>
      </Router>
    )
  }
}

const mapProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  logInPending: state.auth.logInPending
})

const mapDispatch = {
}

export default connect(mapProps, mapDispatch)(Routes)
