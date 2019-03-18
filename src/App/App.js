import React, {Component, Fragment} from "react"
import Nav from "components/Nav"
import {ThemeProvider} from "styled-components"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import Routes from "./Routes"
import {muiTheme, theme} from "./theme"

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Nav />
            <Routes />
          </Fragment>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}
