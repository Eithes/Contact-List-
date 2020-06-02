import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact, setCurrentContact, clearCurrentContact } from '../actions/contactsActions';
  
const ContactItem = ({ contact, deleteContact, setCurrentContact, clearCurrentContact }) => {

  const { id, name, phone, email, type } = contact;

  const handleDelete = () => {
    deleteContact(id);
    clearCurrentContact();
  }

  const handleEdit = () => {
    setCurrentContact(contact);
  }

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
          <span 
            className={'badge ' + 
            (type === 'professional' ? 'badge-success' : 'badge-primary')}
            style={{ float: "right" }}
          >
              {type[0].toUpperCase() + type.slice(1)}
          </span>         
      </h3>
      <ul className='list'>
        {email && (<li>
          <i className='fas fa-envelope-open' />{' '}{email}
        </li>)}
        {phone && (<li>
          <i className='fas fa-phone' />{' '}{phone}
        </li>)}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={handleEdit}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={handleDelete}>Delete</button>
      </p>
    </div>
  )
};

ContactItem.propTypes = {
  contact:PropTypes.object.isRequired,
};

export default connect(null, { deleteContact, setCurrentContact, clearCurrentContact })(ContactItem);
