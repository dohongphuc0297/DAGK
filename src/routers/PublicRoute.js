import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...otherProps
}) => (
        <Route {...otherProps} component={(props) => {
            if (isAuthenticated) {
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

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user
});

export default connect(mapStateToProps)(PublicRoute);