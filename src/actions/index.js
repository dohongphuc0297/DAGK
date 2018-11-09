import * as types from "./types";

export const AddCurChat = (user) => (dispatch, getState, getFirebase) => {
  //console.log("addCur action");
  //console.log(user);
  return dispatch({ type: types.ADD_CURCHAT, payload: user });
};

export const addCurChat = (user) => (dispatch, getState, getFirebase) => {
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
    refreshMessages();
  return dispatch({ type: types.ADD_CURCHAT, payload: user });
};

export const login = (user) => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  var t = new Date();
  //console.log(t);
  usersRef
    .doc(user.uid)
    .set({
      status: true,
      lastSignIn: t,
    }, { merge: true });
  return dispatch({ type: types.LOGIN, payload: user });
};

export const logout = () => (dispatch, getState, getFirebase) => {
  // const firebase = getFirebase();
  // const user = firebase.auth().currentUser;
  // const db = firebase.firestore();
  // const usersRef = db.collection("users");
  // var t = new Date();
  // console.log(t);
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

export const sendMessage = (people, message) => (dispatch, getState, getFirebase) => {
  if (people === undefined || message === undefined || people === null || message === null) return;

  console.log(people);
  console.log(message);
  const firebase = getFirebase();
  const auth = firebase.auth().currentUser;
  const db = firebase.firestore();

  const t = new Date();
  let id = null;
  if (auth.uid >= people.id) {
    id = auth.uid + people.id;
  } else {
    id = people.id + auth.uid;
  }
  const usersRef = db.collection("messages").doc(id);
  usersRef
    .set({
      owners: [auth.uid, people.id],
    }, { merge: true });

  usersRef.get().then(function (doc) {
    if (doc.exists) {
      //get data
      var data = doc.data().contents;

      if (!(data === undefined)) {
        data = data.concat([{ sender: auth.uid, content: message, date: t }]);
      } else {
        data = [{ sender: auth.uid, content: message, date: t }];
      }
      //set database
      usersRef
        .set({
          contents: data,
        }, { merge: true });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
};

export const addMessages = (messages) => (dispatch, getState, getFirebase) => {
  return dispatch({type: types.ADD_MESSAGES, payload: messages});
};

export const refreshMessages = () => (dispatch, getState, getFirebase) => {
  return dispatch({type: types.REFRESH_MESSAGES});
};

export const scroll = () => (dispatch, getState, getFirebase) => {

};