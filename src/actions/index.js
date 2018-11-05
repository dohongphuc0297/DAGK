import * as types from "./types";

export const fetchUser = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.auth().onAuthStateChanged(user => {
    return user;
  });
};

export const login = (uid) => ({
  type: 'LOGIN',
  user: uid
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const logIn = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
      const token = result.credential.accessToken;
      //console.log(token);
      // user info.
      const user = result.user;
      dispatch({type: types.LOGIN, user: user});
      //console.log(user);
    })
    .catch(error => {
      console.log(error);
    });
};

export const logOut = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      dispatch({type: types.LOGOUT});
    })
    .catch(error => {
      console.log(error);
    });
};
