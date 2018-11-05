import React from 'react';
import { connect } from 'react-redux';

const DashBoard = (props) => {
    console.log(props);
    return (
        <div>
            <div>Signed In!</div>
            <h1>Welcome {props.displayName}</h1>
            <img
                alt=""
                src={props.photoURL}
            ></img>
        </div>
    );
}
const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

export default connect(mapStateToProps)(DashBoard);