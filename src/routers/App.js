import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom'
import SignIn from '../components/auth/SignIn';
import DashBoard from "../components/DashBoard";
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import fetchUser from '../actions/index'
// import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
//   userIsAuthenticated, userIsNotAuthenticated } from '../auth';

import history from '../history';
//const Login = userIsNotAuthenticatedRedir(SignIn);
//const Protected = userIsAuthenticatedRedir(DashBoard);

class App extends Component {
  // componentDidMount = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({ user: !!user })
  //     console.log("user", user)
  //   })
  // }

  render() {
    console.log(this.state);
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
// const mapStateToProps = state => ({
//   user: state.user
// })

export default App