import * as types from "./types";

export const fetchUser = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.auth().onAuthStateChanged(user => {
    return user;
  });
};

export const login = (user) => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const db = firebase.firestore();
  const usersRef = db.collection('users');
  usersRef
    .doc(user.userId)
    .set({
      status: true,
    }, { merge: true });
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const logIn = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore();
  firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
      // user info.
      const user = result.user;
      console.log(user);
      const usersRef = db.collection('users');
      usersRef
        .doc(user.userId)
        .set({
          status: true,
          
        }, { merge: true });
      dispatch({ type: types.LOGIN, user: user });
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
      dispatch({ type: types.LOGOUT });
    })
    .catch(error => {
      console.log(error);
    });
};
