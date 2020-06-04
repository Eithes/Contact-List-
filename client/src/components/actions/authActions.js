import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from './types';
import axios from 'axios';

export const registerUser = (user) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    const res = await axios.post('/api/users', user, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });    
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
    });
  }
}

export const loadUser = () => {
  
}

export const logInUser = () => {
  
}

export const logOutUser = () => {
  
}

export const clearErrors = () => {
  return {    
    type: CLEAR_ERRORS
  }
}