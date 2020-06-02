import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = ({contact: { contacts, filteredContacts }}) => {

  let contactsList;

  if(filteredContacts !== null) {
    contactsList = filteredContacts.map(contact => 
      <CSSTransition key={contact.id} timeout={500} classNames='item' >
        <ContactItem contact={contact}/>
      </CSSTransition>      
    );
  } else { 
    contactsList = contacts.map(contact => 
      <CSSTransition key={contact.id} timeout={500} classNames='item' >
        <ContactItem contact={contact}  />
      </CSSTransition> 
    );
  }  
  
  return (
    <TransitionGroup>
      {contactsList}
    </TransitionGroup>
  )
};

Contacts.propTypes = {

};

const mapStateToProps = state => ({
  contact: state.contact 
});


export default connect(mapStateToProps)(Contacts);
