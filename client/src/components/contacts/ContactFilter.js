import React, { useRef, useEffect } from 'react';
import {connect} from 'react-redux';
import { filterContacts, clearFilteredContacts } from '../actions/contactsActions';

const ContactFilter = ({ filteredContacts, filterContacts, clearFilteredContacts }) => {

  const text = useRef('');

  useEffect(() => {
    if(filteredContacts === null ) {
      text.current.value = '';
    }
  });

  const handleFilter = (e) => {
    if(text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilteredContacts();
    }
  }

  return (
    <form>
      <input 
        ref={text} 
        type='text' 
        name='filter' 
        placeholder='Filter Contacts...'
        onChange={handleFilter}
      />
    </form>
  )
};

const mapStateToProps = state => ({
  filteredContacts: state.contact.filteredContacts
});

export default connect(mapStateToProps, {filterContacts, clearFilteredContacts})(ContactFilter);
