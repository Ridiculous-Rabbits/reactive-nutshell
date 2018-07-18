import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Nutshell from './Nutshell';
import registerServiceWorker from './registerServiceWorker';
import NavBar from "./Nav/NavBar"

ReactDOM.render((
<Router>
    <React.Fragment>
    <NavBar />
    <Nutshell />
    </React.Fragment>
</Router>
), document.getElementById('root'));
registerServiceWorker();
