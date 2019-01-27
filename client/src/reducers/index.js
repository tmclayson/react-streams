import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // give the named export an alias for clarity
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});