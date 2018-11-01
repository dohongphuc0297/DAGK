import React, { Component } from 'react';
import SignIn from "./auth/SignIn";
import DashBoard from "./DashBoard";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBAYuGJIT496wCVE0RTQD0g5H5Oa_3RvqY",
  authDomain: "dagk-a845c.firebaseapp.com"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);


class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <DashBoard
            firebase={firebase} />
        ) : (
            <SignIn
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
      </div>
    );
  }
}

export default App;