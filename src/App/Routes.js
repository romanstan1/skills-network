import React, {Component, Fragment} from "react"
import {Route, Redirect, Switch} from "react-router-dom"
import {connect} from "react-redux"
import {Home, SendEmail, SignIn, Demo} from "pages"
// import history from "store/index"
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
      <Route exact path="/demo" component={Demo} />
      <Route exact path="/send-email" component={SendEmail} />
      <Route exact path="/sign-in" component={SignIn} />
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
    authPending: PropTypes.bool.isRequired
  }

  render() {
    const {authPending, isAuthenticated} = this.props

    if (authPending) return <Loading />
    if (isAuthenticated) return <Authenticated />
    return <NonAuthenticated />
  }
}

const mapProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authPending: state.auth.authPending
})

const mapDispatch = {}

export default connect(mapProps, mapDispatch)(Routes)
