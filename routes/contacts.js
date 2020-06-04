const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const User = require('../models/User');
const auth = require('../middleware/auth');
const {contactValidator, validate} = require('../helpers/validators');

// @route    GET api/contacts
// @desc     Get all contacts of user
// @access   Private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.json(contacts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  } 
});

// @route    POST api/contacts
// @desc     Add a contact
// @access   Private

router.post('/', [auth, contactValidator(), validate], async (req, res) => {
  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }  
});

// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private

router.put('/:id', [auth, contactValidator(), validate], async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
   let contact = await Contact.findById(req.params.id);   
   if(!contact) res.status(404).json('Contact not found');

   if(contact.user.toString() !== req.user.id ) {
     return res.status(401).json('Not authorized');
   }

   contact = await Contact.findByIdAndUpdate(req.params.id, 
    { $set: contactFields },
    { new: true }
    );
   res.json(contact);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route    DELETE api/contacts/:id
// @desc     Delete a contact
// @access   Private

router.delete('/:id', auth, async(req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);   
    if(!contact) res.status(404).json('Contact not found');
 
    if(contact.user.toString() !== req.user.id ) {
      return res.status(401).json('Not authorized');
    }
 
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
    
   } catch (error) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
});


module.exports = router;