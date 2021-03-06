import * as types from "./types";

export const AddCurChat = (user) => (dispatch, getState, getFirebase) => {
  //console.log(user);
  return dispatch({ type: types.ADD_CURCHAT, payload: user });
};

export const addCurChat = (user) => (dispatch, getState, getFirebase) => {
  //console.log(user);
  const firebase = getFirebase();
  const auth = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection("users");

  //set current chat
  usersRef
    .doc(auth.uid)
    .set({
      currentChatUser: user.id,
    }, { merge: true });
  dispatch(refreshMessages());
  return dispatch({ type: types.ADD_CURCHAT, payload: user });
};

export const login = (user) => (dispatch, getState, getFirebase) => {
  if (user === undefined || user === null) return;
  const firebase = getFirebase();
  const db = firebase.firestore();
  const usersRef = db.collection("users");

  //set up info when login
  //time now
  var t = new Date();
  //set info for user auth
  usersRef
    .doc(user.uid)
    .set({
      status: true,
      name: user.displayName,
      avatarUrl: user.photoURL,
      mail: user.email,
      lastSignIn: t,
    }, { merge: true });

  return dispatch({ type: types.LOGIN, payload: user });
};



export const logIn = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  //const functions = firebase.functions();

  //sign in with google provider
  firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
      // user info.
      const user = result.user;
      //time now
      var t = new Date();
      //set info for user auth
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
  usersRef
    .doc(user.uid)
    .set({
      status: false,
      lastSignOut: t,
    }, { merge: true }).then(()=>{
      firebase.auth()
    .signOut()
    .then(() => {
      //Sign-out successful.
    })
    }).catch(error => {
      console.log(error);
    });
};

export const sendMessage = (people, message) => (dispatch, getState, getFirebase) => {
  if (people === undefined || message === undefined || people === null || message === null) return;

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

export const starUser = (user) => (dispatch, getState, getFirebase) => {
  if (user === null || user === undefined) return;
  const firebase = getFirebase();
  const auth = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection("users").doc(auth.uid);

  usersRef.get().then(function (doc) {
    if (doc.exists) {
      //get data
      var data = doc.data().stared;

      if (!(data === undefined)) {
        //check if exist
        var index = data.findIndex(x => x.id === user.id);

        if (index >= 0) {
          //delete it if exist
          data[index].status = !data[index].status;

        } else {
          //push it in
          data = data.concat([{ id: user.id, status: true }]);

        }
      } else {
        data = [{ id: user.id, status: true }];
      }

      usersRef
        .set({
          stared: data,
        }, { merge: true });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

  return dispatch({ type: types.STAR_USER });
};

export const uploadImage = (user, file) => (dispatch, getState, getFirebase) => {
  if (file === null || file === undefined) return;
  if (user === null || user === undefined) return;

  const firebase = getFirebase();
  const auth = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(auth.uid + '/' + file.name);

  imageRef.getDownloadURL().then(function (downloadURL) {
    dispatch(sendMessage(user, downloadURL));
  }).catch(function (error) {
    imageRef.put(file).then(function (snapshot) {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        dispatch(sendMessage(user, downloadURL));
      });
    });
  });
};

export const addMessages = (messages) => (dispatch, getState, getFirebase) => {
  return dispatch({ type: types.ADD_MESSAGES, payload: messages });
};

export const refreshMessages = () => (dispatch, getState, getFirebase) => {
  return dispatch({ type: types.REFRESH_MESSAGES });
};

export const scroll = () => (dispatch, getState, getFirebase) => {

};

export const logout = () => (dispatch, getState, getFirebase) => {

};