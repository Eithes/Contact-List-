const { body, validationResult } = require('express-validator');

const registerUserValidator = () => {
  return [
    body('name', 'Name is required')
      .notEmpty(),
    body('email', 'Please include a valid email')
      .isEmail(),
    body('password', 'Please, enter a password with 6 or more characters')
      .isLength({ min: 6, max: 100}),
  ]
};

const loginUserValidator = () => {
  return [    
    body('email', 'Please include a valid email')
      .isEmail(),
    body('password', 'Password is required')
      .exists(),
  ]
};

const contactValidator = () => {
  return [    
    body('name', 'Name is requires')
      .notEmpty(),
  ]
};  

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  registerUserValidator,
  loginUserValidator,
  contactValidator,
  validate,
}
