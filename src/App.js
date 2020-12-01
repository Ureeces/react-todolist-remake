import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Todo from "./components/Todo/Todo";
import Signin from "./components/Signin/Signin";

class App extends Component {
  state = {
    isAuth: false
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route 
            exact
            path="/"
            component={Signin}
          />

          <Route
            exact
            path="/todo"
            component={Todo}
          />
        </Switch>
      </Router>
      )
    }
}

export default App;
