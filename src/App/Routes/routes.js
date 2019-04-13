import React, {Fragment} from "react"
import {Route, Redirect, Switch} from "react-router-dom"
import {Home, SendEmail, SignIn, SignUp, Demo} from "pages"
// import PropTypes from "prop-types"

import Nav from "components/Nav"

export const Authenticated = () =>
  <Fragment>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/project/:project/input" component={Home} />
      <Route
        exact
        path="/project/:project/view"
        render={(props) => <Home {...props} />} />
      <Redirect from="/project/:project" to="/project/:project/view" />
      <Redirect to="/" />
    </Switch>
  </Fragment>

export const NonAuthenticated = () =>
  <Fragment>
    <Switch>
      <Route exact path="/demo" component={Demo} />
      <Route exact path="/send-email" component={SendEmail} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-in" component={SignIn} />
      <Redirect to="/sign-in" />
    </Switch>
  </Fragment>

export const Loading = () =>
  <div className="loading-screen">
    log in pending
  </div>
