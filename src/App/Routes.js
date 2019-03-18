import React, {Component, Fragment} from "react"
import {Route, Router, Redirect, Switch} from "react-router-dom"
import {connect} from "react-redux"
import history from "store"

import PropTypes from "prop-types"


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

  renderIsAuthenticated = () => {
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
            this.renderLoginPending()
          }
          {
            this.renderIsAuthenticated()
          }

          //
          //     isAuthenticated ?
          //       <Fragment>
          //         <Switch>
          //           {/* <Route exact path="/sign-in" render={() => <Redirect to="/" />} />
          //           <Route path="/update-location" component={Inputs} />
          //           <Route path="/add-location" component={Inputs} />
          //           <Route path="/delete-location" component={DeleteInput} />
          //           <Route path="/send-notification" component={SendNotification} />
          //           <Route path="/download-data" component={DownloadData} />
          //           <Route exact path="/" component={Main} />
          //           <Route path="/:location" component={Main} />
          //           <Route path="/:location/:date" component={Main} />
          //           <Redirect to="/" /> */}
          //         </Switch>
          //       </Fragment>
          //       :
          //       <Fragment>
          //         <Switch>
          //           <Route exact path="/send-email" component={SendEmail} />
          //           <Route exact path="/sign-in" component={SignIn} />
          //           <Redirect to="/sign-in" />
          //         </Switch>
          //       </Fragment>

          // }
        </Fragment>
      </Router>
    )
  }
}

const mapProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // pathname: state.routing.location.pathname,
  // locations: state.data.locations,
  // dates: state.data.dates,
  // selectedLocation: state.data.selectedLocation,
  // user: state.auth.user,
  logInPending: state.auth.logInPending
})

const mapDispatch = {
  // logInSuccessful,
  // selectLocation,
  // selectDate,
  // switchPage,
  // focusOnLocation,
  // notLoggedIn
}

export default connect(mapProps, mapDispatch)(Routes)
