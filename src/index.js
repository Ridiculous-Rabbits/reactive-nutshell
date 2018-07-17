import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Nutshell from './Nutshell';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
<Router>
    <Nutshell />
</Router>
), document.getElementById('root'));
registerServiceWorker();
