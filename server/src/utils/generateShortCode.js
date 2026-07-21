const { nanoid } = require('nanoid');

const generateShortCode = (length = 8) => nanoid(length);

module.exports = generateShortCode;
