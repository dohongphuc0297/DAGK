import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import Reducers from '../reducer/index';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase, firebaseReducer  } from 'react-redux-firebase'
import firebase from 'firebase'
import { firebaseConfig } from "../firebase/firebase";
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

export default () => {
    firebase.initializeApp(firebaseConfig);

    // react-redux-firebase options
    const config = {
        userProfile: null, // firebase root where user profiles are stored
        users: 'users',
        //enableLogging: false, // enable/disable Firebase's database logging
        useFirestoreForProfile: true,
        attachAuthIsReady: true
    }

    firebase.firestore().settings({ timestampsInSnapshots: true });

    const createStoreWithFirebase = compose(
        applyMiddleware(thunk.withExtraArgument(getFirebase)),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase, config)
    );

    const rootReducer = combineReducers({
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        reducers: Reducers
      })

    // Create store with reducers and initial state
    const initialState = {}
    const store = createStore(rootReducer, initialState, createStoreWithFirebase);

    return store;
};