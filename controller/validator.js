var { check } = require('express-validator')

module.exports = {
  checkforadduser: [
    check('userId', 'Login must be 4+ character long.')
      .isLength({ min: 4 })
      .matches(/^[a-zA-Z ]*[0-9]*$/).withMessage('Login should be start with alphabet and should not contain symbols'),
    check('name', 'Name must be only alphabets and 2+ character long.')
      .isLength({ min: 2 })
      .matches(/^[a-zA-Z ]*$/)
  ]
}
