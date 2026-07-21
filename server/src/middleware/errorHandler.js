module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'field';
    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists`,
    });
  }

  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map((e) => e.message).join(', ');
    return res.status(422).json({ success: false, message });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
