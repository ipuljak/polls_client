import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  AUTH_NAME,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

//const ROOT_URL = 'http://localhost:3010/api';
const ROOT_URL = 'https://puljak.ca/polls/api';

/**
 *  Set the state to AUTH_ERROR to indicate an error occured during an authentication call
 */
export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

/**
 *  Authenticate and sign in a user given a username and password
 */
export const signInUser = ({username, password}) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/auth/login`, { username, password })
      .then(response => {
        // If the request is good update state to indicate that the user is authenticated
        dispatch({
          type: AUTH_USER
        });
        // Save the JWT token to local storage
        localStorage.setItem('token', response.data.token);
        // Save their username
        dispatch({
          type: AUTH_NAME,
          payload: response.data.UserId
        });
        // Redirect to the home route
        browserHistory.push('/');
      })
      .catch(error => {
        dispatch(authError('Incorrect username or password.'));
      });
  };
};

/** 
 *  Register a user given a unique username and password
 */
export const signUpUser = ({username, password}) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/auth/register`, { username, password })
      .then(response => {
        // If the request is good update state to indicate that the user is authenticated
        dispatch({
          type: AUTH_USER
        });
        // Save the JWT token to local storage
        localStorage.setItem('token', response.data.token);
        // Save their username
        dispatch({
          type: AUTH_NAME,
          payload: response.data.UserId
        });
        // Redirect to the home route
        browserHistory.push('/');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
};

/**
 *  Sign a user out
 */
export const signOutUser = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');
  // Redirect to the home route
  browserHistory.push('/');
  return {
    type: UNAUTH_USER
  };
};