const express = require('express');
const router = express.Router();
const {registerUserValidator, validate} = require('../helpers/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// @route    POST api/users
// @desc     Register a user
// @access   Public

router.post('/', registerUserValidator(), validate, async (req, res) => {  
  const { name, email, password } = req.body;
  try {
    
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({
        msg: 'User already exists'
      });
    }
 
    user = new User({name, email, password});
   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    console.log(user);

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000, // 3600 in prod - hour      
    }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });
    
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


module.exports = router;