import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import pollReducer from './pollReducer';

// Combine the reducers to form the root reducer
const rootReducer = combineReducers({
  form,
  auth: authReducer,
  polls: pollReducer
});

export default rootReducer;