import React from 'react';

class DashBoard extends React.Component {


    render() {
        return (
            <div>
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
                        <ul className="nav navbar-nav">
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><button onClick={() => this.props.firebase.auth().signOut()} className="btn btn-default navbar-btn">Sign out</button></li>

                        </ul>
                    </div>
                </nav>
                <div>Signed In!</div>
                <h1>Welcome {this.props.firebase.auth().currentUser.displayName}</h1>
                <img
                    alt=""
                    src={this.props.firebase.auth().currentUser.photoURL}
                ></img>
            </div>
        );
    }
}

export default DashBoard;