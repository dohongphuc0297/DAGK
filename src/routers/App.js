import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom'
import SignIn from '../components/auth/SignIn';
import DashBoard from "../components/DashBoard";
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import {fetchUser} from '../actions/index'
// import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
//   userIsAuthenticated, userIsNotAuthenticated } from '../auth';

import history from '../history';
//const Login = userIsNotAuthenticatedRedir(SignIn);
//const Protected = userIsAuthenticatedRedir(DashBoard);

class App extends Component {
  componentWillUpdate = (props) => {
    const user = fetchUser();
    console.log(user);
    if(user)
    {
      history.push('/dashboard');
    }else{
      history.push('/');
    }
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
// const mapStateToProps = state => ({
//   user: state.user
// })

export default App