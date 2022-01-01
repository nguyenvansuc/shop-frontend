import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './app/store/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import XProvider from './app/test';
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        {/* <XProvider>
          <App />
        </XProvider> */}
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
