const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorFormatter = ({ msg }) => msg;
    const errors = validationErrors.formatWith(errorFormatter).mapped();

    const err = Error("Validation error");
    err.errors = errors;
    err.statusCode = 400;
    err.title = "Validation error";
    next(err);
  }
  next();
}

module.exports = handleValidationErrors;