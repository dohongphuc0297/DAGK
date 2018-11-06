import * as types from "./types";

export const fetchUser = (user) => (dispatch, getState, getFirebase) => {
  //console.log(user);
  const firebase = getFirebase();
  const auth = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  usersRef
    .doc(auth.uid)
    .set({
      currentChatUser: user.id,
    }, { merge: true });
};

export const login = (user) => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  var t = new Date();
  console.log(t);
  usersRef
    .doc(user.uid)
    .set({
      status: true,
      lastSignIn: t,
    }, { merge: true });
};

export const logout = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  var t = new Date();
  console.log(t);
  // usersRef
  //   .doc(user.uid)
  //   .set({
  //     status: false,
  //     lastSignOut: t,
  //   }, { merge: true });
};

export const logIn = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
      // user info.
      const user = result.user;
      var t = new Date();
      usersRef
        .doc(user.uid)
        .set({
          status: true,
          name: user.displayName,
          avatarUrl: user.photoURL,
          mail: user.email,
          lastSignIn: t,
        }, { merge: true });
    })
    .catch(error => {
      console.log(error);
    });
};

export const logOut = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  var t = new Date();
  console.log(user);
  usersRef
        .doc(user.uid)
        .set({
          status: false,
          lastSignOut: t,
        }, { merge: true });
  firebase.auth()
    .signOut()
    .then(() => {
      //Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};