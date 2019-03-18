import React, {Component, Fragment} from "react"
import {Route, Switch} from "react-router-dom"
import Home from "pages/Home"
import Nav from "components/Nav"
import {ThemeProvider} from "styled-components"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import {muiTheme, theme} from "./theme"

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={Home} />
            </Switch>
          </Fragment>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}
