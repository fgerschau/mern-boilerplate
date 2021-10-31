import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { unregister } from './ServiceWorker';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

unregister();
