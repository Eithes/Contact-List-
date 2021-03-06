import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  error: null,
  user: null
};

export default(state = initialState, action) => {
  switch(action.type) { 
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated:true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token:null,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
        user: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }  
    default:
      return state;
  }
}

