const { Url } = require('../models');
const env = require('../config/env');
const generateShortCode = require('../utils/generateShortCode');
const { success, fail } = require('../utils/apiResponse');

const formatUrl = (url) => ({
  id: url.id,
  originalUrl: url.originalUrl,
  shortCode: url.shortCode,
  shortUrl: `${env.BASE_URL}/${url.shortCode}`,
  clickCount: url.clickCount,
  createdAt: url.createdAt,
  updatedAt: url.updatedAt,
});

const RESERVED_CODES = new Set(['api', 'auth', 'login', 'signup', 'dashboard']);

exports.createUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias } = req.body;
    let shortCode = customAlias?.trim() || generateShortCode();

    if (RESERVED_CODES.has(shortCode.toLowerCase())) {
      return fail(res, 'This alias is reserved and cannot be used', 400);
    }

    const existing = await Url.findOne({ where: { shortCode } });
    if (existing) {
      return fail(res, 'This short code is already taken', 409);
    }

    const url = await Url.create({
      originalUrl,
      shortCode,
      userId: req.user.id,
    });

    return success(res, { url: formatUrl(url) }, 201);
  } catch (err) {
    next(err);
  }
};

exports.getUrls = async (req, res, next) => {
  try {
    const urls = await Url.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    return success(res, { urls: urls.map(formatUrl) });
  } catch (err) {
    next(err);
  }
};

exports.updateUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { originalUrl, shortCode } = req.body;

    const url = await Url.findOne({
      where: { id, userId: req.user.id },
    });

    if (!url) {
      return fail(res, 'URL not found', 404);
    }

    if (shortCode && shortCode !== url.shortCode) {
      if (RESERVED_CODES.has(shortCode.toLowerCase())) {
        return fail(res, 'This alias is reserved and cannot be used', 400);
      }

      const duplicate = await Url.findOne({ where: { shortCode } });
      if (duplicate) {
        return fail(res, 'This short code is already taken', 409);
      }

      url.shortCode = shortCode;
    }

    if (originalUrl) {
      url.originalUrl = originalUrl;
    }

    await url.save();

    return success(res, { url: formatUrl(url) });
  } catch (err) {
    next(err);
  }
};

exports.deleteUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    const url = await Url.findOne({
      where: { id, userId: req.user.id },
    });

    if (!url) {
      return fail(res, 'URL not found', 404);
    }

    await url.destroy();

    return success(res, { message: 'URL deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.redirect = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ where: { shortCode } });
    if (!url) {
      return fail(res, 'Short URL not found', 404);
    }

    await url.increment('clickCount');

    return res.redirect(302, url.originalUrl);
  } catch (err) {
    next(err);
  }
};
