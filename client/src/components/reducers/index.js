import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  contact: contactReducer,
  auth: authReducer,
  alert: alertReducer,
});
