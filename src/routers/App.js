import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom'
import SignIn from '../components/auth/SignIn';
import DashBoard from "../components/DashBoard";
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import history from '../history';

class App extends Component {
  componentWillUpdate = (props) => {
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute path="/" component={SignIn} exact={true} />
          <PrivateRoute path="/dashboard" component={DashBoard} />
        </Switch>
      </Router>
    );
  }
}

export default App