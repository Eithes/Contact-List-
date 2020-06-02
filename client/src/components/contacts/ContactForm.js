import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  addContact,  
  clearCurrentContact, 
  updateContact 
} from '../actions/contactsActions';

const ContactForm = ({currentContact, addContact, clearCurrentContact, updateContact}) => {

  const [ contact, setContact ] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if(currentContact !== null) { 
      setContact(currentContact);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }  
  }, [currentContact]);

  const handleChange = (e) => {
    setContact({...contact, [e.target.name]: e.target.value});      
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    if(currentContact === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }    
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
  };

  const handleClear = () => {
    clearCurrentContact();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">{currentContact ? 'Edit Contact' : 'Add Contact'} </h2>
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        value={name} 
        onChange={handleChange}
      />
      <input 
        type="email" 
        placeholder="Email" 
        name="email" 
        value={email} 
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder="Phone" 
        name="phone" 
        value={phone} 
        onChange={handleChange}
      />
      <h5> Contact type </h5>
      <input 
        type="radio"
        name="type" 
        value="personal" 
        onChange={handleChange}
        checked={type === "personal"}       
      /> Personal {' '}
        <input 
        type="radio"
        name="type" 
        value="professional"
        onChange={handleChange}
        checked={type === "professional"}       
      /> Professional {' '}
      <div>
      <input 
        type="submit"
        value={currentContact ? 'Update Contact' : 'Add Contact'}      
        className="btn btn-primary btn-block"  
      />
      </div>
      {currentContact && <div>
        <button className='btn btn-block btn-light' onClick={handleClear}>Clear</button>
      </div>}   
    </form>
  )
};

const mapStateToProps = state => ({
  currentContact: state.contact.currentContact
});

export default connect(
  mapStateToProps,
  { 
    addContact, 
    clearCurrentContact, 
    updateContact 
  }
)(ContactForm);
