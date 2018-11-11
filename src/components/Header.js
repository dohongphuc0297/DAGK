import React from 'react';
import { logOut } from "../actions/index";
import { connect } from 'react-redux';

const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="navbar-brand">CHAT WITH FIREBASE</div>
                </div>
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><div className="auth"><img src={props.photoURL ? props.photoURL : "./default_avatar.png"} alt=""></img>{props.displayName}</div></li>
                        <li><button onClick={props.logout} className="btn btn-default navbar-btn">Sign out</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logOut())
});

export default connect(undefined, mapDispatchToProps)(Header);