const express = require('express');
const router = express.Router();
const {loginUserValidator, validate} = require('../helpers/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth
// @desc     Authenticate a user & get token // login
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