import {
  FETCH_ERROR,
  FETCH_POLLS
} from '../actions/types';

/**
 *  Main polling application reducer
 */
export default (state = {}, action) => {
  switch (action.type) {
    // If there is an error during a fetching API call, set an error message
    case FETCH_ERROR:
      return {...state, error: action.payload};
    // Save the recently made polls in the state
    case FETCH_POLLS:
      return {...state, homePolls: action.payload};
    default:
      return state;
  }
};