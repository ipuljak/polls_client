// Main index requirements
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';

// Main requirements to handle state
import { AUTH_USER, AUTH_NAME } from './actions/types';
import reducers from './reducers';
import { saveState } from './middleware/localStorage';

// Main index components
import App from './core/app';
import Create from './routes/create';
import Home from './routes/home';
import Poll from './routes/poll';

// Create the redux store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');

// Let our application know the user is authenticated if a token exists
if (token) {
  store.dispatch({ type: AUTH_USER });
  store.dispatch({
    type: AUTH_NAME,
    payload: JSON.parse(localStorage.state).auth.username
  });
}

// Add a listener for our store to be saved to localStorage
store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route name='create' path='/create' component={Create} />
        <Route name='poll' path='/poll/:id' component={Poll} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#root')
);