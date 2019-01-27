import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  // If you wish to set the Redux store once for your application, then this is the way to go. This is usually
  // the case for apps that use only one Redux store. The store is passed down to container components down
  // the app’s hierarchy using React’s context mechanism:
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector('#root')
);