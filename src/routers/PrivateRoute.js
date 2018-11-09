import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { firebaseConnect, isEmpty } from 'react-redux-firebase';


const PrivateRoute = ({
    firebase,
    auth,
    login,
    component: Component,
    ...otherProps
}) => (
        <Route {...otherProps} component={(props) => {
            if (!isEmpty(auth)) {
                return (
                    <div>
                        <Header {...auth} />
                        <Component {...props} />
                    </div>
                );
            } else {
                return (
                    <Redirect to='/' />
                );
            }
        }} />
    );

PrivateRoute.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object,
    login: PropTypes.func
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)