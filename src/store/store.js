import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import Reducers from '../reducer/index';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase, firebaseReducer  } from 'react-redux-firebase'
import firebase from 'firebase'
import { firebaseConfig } from "../firebase/firebase";

export default () => {
    firebase.initializeApp(firebaseConfig);

    // react-redux-firebase options
    const config = {
        userProfile: 'users', // firebase root where user profiles are stored
        enableLogging: false, // enable/disable Firebase's database logging
    }
    const createStoreWithFirebase = compose(
        applyMiddleware(thunk.withExtraArgument(getFirebase)),
        reactReduxFirebase(firebase, config)
    );

    const rootReducer = combineReducers({
        firebase: firebaseReducer,
        reducers: Reducers
      })

    // Create store with reducers and initial state
    const initialState = {}
    const store = createStore(rootReducer, initialState, createStoreWithFirebase);

    return store;
};