import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css';
//import './assets/js/bootstrap.min.js';
import './index.css';
import App from './routers/App';
import * as serviceWorker from './serviceWorker';
import getAppStore from './store/store';
import { Provider } from 'react-redux';

const store = getAppStore();

let isRendered = false;
const renderApp = () => {
    if (!isRendered) {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>
            , document.getElementById('root'));
        isRendered = true;
    }
}

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
