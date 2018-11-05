import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...otherProps
}) => (
        <Route {...otherProps} component={(props) => {
            if (isAuthenticated) {
                return (
                    <div>
                        <Header />
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

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user
});

export default connect(mapStateToProps)(PrivateRoute);