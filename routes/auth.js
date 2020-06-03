const express = require('express');
const router = express.Router();
const {registerUserValidator, validate} = require('../helpers/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route    POST api/auth
// @desc     Authenticate a user & get token
// @access   Public

router.post('/', loginUserValidator(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({
        msg: 'Invalid credentials'
      })
    }

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