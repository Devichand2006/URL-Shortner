const success = (res, data, statusCode = 200) =>
  res.status(statusCode).json({ success: true, data });

const fail = (res, message, statusCode = 400) =>
  res.status(statusCode).json({ success: false, message });

module.exports = { success, fail };
