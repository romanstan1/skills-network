import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <span>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route component={Main}/>
        </Switch>
      </span>
    )
  }
}

export default App
