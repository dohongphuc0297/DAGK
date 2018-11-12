const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  apiKey: "AIzaSyBAYuGJIT496wCVE0RTQD0g5H5Oa_3RvqY",
  authDomain: "dagk-a845c.firebaseapp.com",
  databaseURL: "https://dagk-a845c.firebaseio.com",
  projectId: "dagk-a845c",
  storageBucket: "dagk-a845c.appspot.com",
  messagingSenderId: "392075239970"
});

exports.onUserStatusChanged = functions.database.ref('/status/{userId}') // Reference to the Firebase RealTime database key
  .onUpdate((event, context) => {
    const usersRef = firestore.collection('/users'); // Create a reference to the Firestore Collection

    return event.data.ref.once('value')
      .then(snapShot => {
        console.log(status);
        return snapShot.val();
      })
      .then(status => {  // Get the latest value from the Firebase Realtime database
        //snapshot.val()
        if (status === 'offline') {
          // Set the Firestore's document's online value to false
          var t = new Date();
          console.log(event.params.userId);
          console.log(status);
          usersRef
            .doc(event.params.userId)
            .set({
              status: false,
              lastSignOut: t,
            }, { merge: true });
        }
        return;
      })
  });