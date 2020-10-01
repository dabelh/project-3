import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import CompA from './components/comp-a';
import CompB from './components/comp-b';
import StudentDetails from './components/studentDetails';
import Table from './components/justTable';
import AvgGrade from './components/avrageGrade';
import reducer from './reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(logger))
)

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <StudentDetails />
                <Table/>
                <CompB />
                <AvgGrade/>
            </div>
        </Provider>
    );
}

export default App;
