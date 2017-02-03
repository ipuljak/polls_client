import {
  AUTH_USER,
  AUTH_NAME,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

// Authentication reducer
export default (state = {}, action) => {
  switch (action.type) {
    // If the user has been authorized, flag authenticated to true
    case AUTH_USER:
      return {...state, error: '', authenticated: true };
    // If the user has been authorized, add their username to the state
    case AUTH_NAME:
      return {...state, username: action.payload };
    // If the user has been unauthorized, flag authenticated to false
    case UNAUTH_USER:
      state = undefined;
      return {...state, authenticated: false };
    // If there is an error with the authentication, set an error message
    case AUTH_ERROR:
      return {...state, error: action.payload };
    default:
      return state;
  }
};