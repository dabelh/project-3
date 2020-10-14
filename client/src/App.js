import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import login from './components/login';
import signup from './components/signup';
import vacations from './components/vacations';


import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(logger,thunk))
)


function App() {
    return (
        <Provider store={store}>
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/login' component={login}/>
                    <Route path='/signup' component={signup}/>
                    <Route path='/vacations' component={vacations}/>
                </Switch>
            </Router>
        </div>
        </Provider>
    );
}

export default App;



















// Client
// TodoListWrapper statefull (fetch all tasks on load)

// TodoListAdd stateless
// TodoListTable stateless

// use the following component from matiral UI:
// https://material-ui.com/components/buttons/
// https://material-ui.com/components/pickers/
// https://material-ui.com/components/text-fields/
// https://material-ui.com/components/tables/
