import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';

const PublicRoute = ({
    firebase,
    auth,
    component: Component,
    ...otherProps
}) => (
        <Route {...otherProps} component={(props) => {
            //redirect if login or not
            if (!isEmpty(auth)) {
                return (
                    <Redirect to='/dashboard' />
                );
            } else {
                return (
                    <Component {...props} />
                );
            }
        }} />
    );

PublicRoute.propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
  }
  
  export default compose(
    firebaseConnect(), //connect to firebase to get auth
    connect(({ firebase: { auth } }) => ({ auth }))
  )(PublicRoute)