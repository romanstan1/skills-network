import React from "react"
import {ThemeProvider} from "styled-components"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import PropTypes from "prop-types"
import {ConnectedRouter} from "connected-react-router"
import {muiTheme, theme} from "./theme"
import Routes from "./Routes"

const App = ({history}) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  history: PropTypes.object
}

export default App
