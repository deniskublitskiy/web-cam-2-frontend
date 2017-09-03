import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

injectTapEventPlugin();

import App from './components/App';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import reducer from './reducers';
import { url } from './config';
import SocketEvents from './sockets/index';
import WebRTCMultiConnection from './utils/WebRTCMultiConnection';
import { initConnection } from './actions/call';

const logger = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        logger
    ));

console.log(store.getState());
SocketEvents.bootstrap(url, store, `userId=${localStorage.getItem('user.id')}`);
store.dispatch(initConnection());
WebRTCMultiConnection.bootstrap(store);

export default class Root extends Component {
    // TODO: Maybe create class User and move this logic there
    get isAuthenticated() {
        return !!localStorage.getItem('token')
            && !!localStorage.getItem('user.id');
    }

    getAppRoute(props) {
        return this.isAuthenticated
            ? <App {...props}/>
            : <Redirect to="/login"/>
    }

    render() {
        return <MuiThemeProvider>
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact path="/" render={::this.getAppRoute}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={SignUp}/>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    }
}