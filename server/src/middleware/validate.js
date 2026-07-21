const { validationResult } = require('express-validator');
const { fail } = require('../utils/apiResponse');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(', ');
    return fail(res, message, 422);
  }
  next();
};

module.exports = validate;
