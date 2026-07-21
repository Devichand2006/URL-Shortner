const jwt = require('jsonwebtoken');
const { User } = require('../models');
const env = require('../config/env');
const { success, fail } = require('../utils/apiResponse');

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return fail(res, 'Email already registered', 409);
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user);

    return success(
      res,
      { token, user: user.toSafeJSON() },
      201
    );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return fail(res, 'Invalid email or password', 401);
    }

    const token = signToken(user);

    return success(res, { token, user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return fail(res, 'User not found', 404);
    }

    return success(res, { user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
};
