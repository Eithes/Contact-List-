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
} from '../actions/types';

const initialState = {
  contacts: [
    {
      id: 1,
      name: 'Mike Smith',
      email: 'mike@tt.ru',
      phone: '111-111-1111',
      type: 'personal'
    },
    {
      id: 2,
      name: 'Katy Wilson',
      email: 'katy@tt.ru',
      phone: '222-222-1111',
      type: 'personal'
    },
    {
      id: 3,
      name: 'Hary Brown',
      email: 'hary@tt.ru',
      phone: '333-333-3333',
      type: 'professional'
    },
  ],
  currentContact: null,
  filteredContacts: null,
  errors: null
};

export default(state = initialState, action) => {
  switch(action.type) { 
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case DELETE_CONTACT: 
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      }
    case SET_CURRENT:
      return {
        ...state,
        currentContact: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        currentContact: null
    }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts:  state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
        })
      }  
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null      
      }    
    default:
      return state;
  }
}

