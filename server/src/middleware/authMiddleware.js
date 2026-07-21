const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { fail } = require('../utils/apiResponse');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return fail(res, 'Authentication required', 401);
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
};

module.exports = authMiddleware;
