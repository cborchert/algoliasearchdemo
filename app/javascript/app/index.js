import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';

const appContainer = (
    <Router>
        <Route key="app--default" component={App}/>
    </Router>
);

document.addEventListener('DOMContentLoaded', () => {

    ReactDOM.render(appContainer, document.body.appendChild(document.createElement('div')));

});
