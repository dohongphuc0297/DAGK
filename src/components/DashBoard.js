import React from 'react';
import { logOut } from "../actions/index";
import { connect } from 'react-redux';

const DashBoard = (props) => {
    console.log(props);
    return (
        <div>
            <div>Signed In!</div>
            <h1>Welcome {props.firebase.auth().currentUser.displayName}</h1>
            <img
                alt=""
                src={props.firebase.auth().currentUser.photoURL}
            ></img>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logOut())
});

export default connect(undefined, mapDispatchToProps)(DashBoard);