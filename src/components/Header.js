import React from 'react';
import { logOut } from "../actions/index";
import { connect } from 'react-redux';

const Header = ({logout}) =>{
    return(
        <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">CHAT</a>
                </div>
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><button onClick={logout} className="btn btn-default navbar-btn">Sign out</button></li>
                    </ul>
                </div>
            </nav>
    );
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logOut())
});

export default connect(undefined, mapDispatchToProps)(Header);