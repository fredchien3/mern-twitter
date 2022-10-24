const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateTweetInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 280 })
    .withMessage('Tweet must be between 1 and 280 characters'),
  handleValidationErrors
];

module.exports = validateTweetInput;