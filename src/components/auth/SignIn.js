import React from "react";
import { logIn } from "../../actions/index";
import { connect } from 'react-redux';
//import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Login = ({ login }) => {
    return (
        <div>
            <section className="login-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">CHAT<br />Login Now</h2>
                            <div className="btn-wraper">
                                <button className="btn btn-lg btn-default"
                                    onClick={login}
                                ><img style={{ height: '30px' }} src="./google_icon.png" alt=""></img> Login With Google</button>
                            </div>
                            <div className="copy-text">Created with <i className="fa fa-heart"></i> by <a href="http://grafreez.com">Grafreez.com</a></div>
                        </div>
                        <div className="col-md-8 banner-sec">
                            <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide"></img>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="banner-text">
                                    <h2>Chat App with Firebase</h2>
                                    <p>Chat with your friends just by login with Goole</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(logIn())
});

export default connect(undefined, mapDispatchToProps)(Login);