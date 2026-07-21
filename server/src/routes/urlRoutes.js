const express = require('express');
const { body, param } = require('express-validator');
const urlController = require('../controllers/urlController');
const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const aliasValidator = body('customAlias')
  .optional({ values: 'falsy' })
  .trim()
  .isLength({ min: 3, max: 20 })
  .withMessage('Custom alias must be between 3 and 20 characters')
  .matches(/^[a-zA-Z0-9_-]+$/)
  .withMessage('Custom alias may only contain letters, numbers, hyphens, and underscores');

const shortCodeValidator = body('shortCode')
  .optional({ values: 'falsy' })
  .trim()
  .isLength({ min: 3, max: 20 })
  .withMessage('Short code must be between 3 and 20 characters')
  .matches(/^[a-zA-Z0-9_-]+$/)
  .withMessage('Short code may only contain letters, numbers, hyphens, and underscores');

router.use(authMiddleware);

router.post(
  '/',
  [
    body('originalUrl')
      .trim()
      .notEmpty()
      .withMessage('Original URL is required')
      .isURL({ require_protocol: true })
      .withMessage('Original URL must be a valid URL with protocol (http/https)'),
    aliasValidator,
  ],
  validate,
  urlController.createUrl
);

router.get('/', urlController.getUrls);

router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Invalid URL id'),
    body('originalUrl')
      .optional({ values: 'falsy' })
      .trim()
      .isURL({ require_protocol: true })
      .withMessage('Original URL must be a valid URL with protocol (http/https)'),
    shortCodeValidator,
  ],
  validate,
  urlController.updateUrl
);

router.delete(
  '/:id',
  [param('id').isInt().withMessage('Invalid URL id')],
  validate,
  urlController.deleteUrl
);

module.exports = router;
