import axios from 'axios';
//import { browserHistory } from 'react-router';

import {
  FETCH_ERROR,
  FETCH_POLLS
} from './types';

const ROOT_URL = 'http://localhost:3010/api';

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
