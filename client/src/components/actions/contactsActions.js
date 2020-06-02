import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
} from './types';
import {v4 as uuidv4}  from 'uuid';
import axios from 'axios';

export const addContact = (contact) => async dispatch => { 
  contact.id = uuidv4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
  });
}

export const deleteContact = (id) => async dispatch => {
  dispatch({
    type: DELETE_CONTACT,
    payload: id,
  });  
};

export const setCurrentContact = (contact) => {
  return {
    type: SET_CURRENT,
    payload: contact,
  }; 
};

export const clearCurrentContact = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const updateContact = (contact) => async dispatch => {  
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
  });
}


export const filterContacts = (text) => async dispatch => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: text,
  });
}

export const clearFilteredContacts = () =>  {
  return {
    type: CLEAR_FILTER
  };
}