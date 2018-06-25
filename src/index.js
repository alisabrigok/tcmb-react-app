import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/loader.css';
import '../node_modules/currency-flags/dist/currency-flags.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
