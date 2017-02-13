import axios from 'axios';
//import { browserHistory } from 'react-router';

import {
  FETCH_ERROR,
  FETCH_POLLS,
  FETCH_SINGLE_POLL,
  CREATE_ERROR
} from './types';

//const ROOT_URL = 'http://localhost:3010/api';
const ROOT_URL = 'https://puljak.ca/polls/api';

/**
 *  Set the state to FETCH_ERROR to indicate an error occured during some fetch call
 */
export const fetchError = error => {
  return {
    type: FETCH_ERROR,
    payload: error
  };
};

/**
 *  Fetch all polls in the database.
 *    TO-DO: Later change this to a weekly/monthly basis to limit page load or paginate
 */
export const fetchHomePolls = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/polls/fetch_all`)
      .then(response => {
        dispatch({
          type: FETCH_POLLS,
          payload: response.data
        });
      }).catch(error => {
        dispatch(fetchError(error));
      });
  };
};

/**
 *  Fetch a single poll to be viewed in it's own page.
 */
export const fetchSinglePoll = id => {
  return dispatch => {
    axios.get(`${ROOT_URL}/polls/${id}/read`)
      .then(response => {
        dispatch({
          type: FETCH_SINGLE_POLL,
          payload: response.data
        });
      }).catch(error => {
        dispatch(fetchError(error));
      });
  };
};

/**
 *  Set the state to CREATE_ERROR if there was a problem creating the poll
 */
export const createError = error => {
  return {
    type: CREATE_ERROR,
    payload: error
  };
};