import {
  FETCH_ERROR,
  FETCH_POLLS,
  FETCH_SINGLE_POLL,
  CREATE_ERROR
} from '../actions/types';

/**
 *  Main polling application reducer
 */
export default (state = {}, action) => {
  switch (action.type) {
    // If there is an error during a fetching API call, set an error message
    case FETCH_ERROR:
      return {...state, error: action.payload };
    // Save the recently made polls in the state
    case FETCH_POLLS:
      return {...state, homePolls: action.payload };
    // Save a single poll to be viewed in the state
    case FETCH_SINGLE_POLL:
      return {...state, poll: action.payload };
    // If there is an error with creating a poll, set an error message
    case CREATE_ERROR:
      return {...state, error: action.payload };
    default:
      return state;
  }
};