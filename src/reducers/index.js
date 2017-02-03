import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';

// Combine the reducers to form the root reducer
const rootReducer = combineReducers({
  form,
  auth: authReducer
});

export default rootReducer;