const asyncHandler = require('express-async-handler');
const ShortUrl = require('../models/shortUrlModel');
const { updateCounter } = require('../config/counter');

const createUrl = asyncHandler(async (req, res) => {
  let shortUrl = await ShortUrl.create({
    originalUrl: req.body.url,
    shortUrl: (await updateCounter('urlCounter')).lastValue
  })
  res.status(200).json({
    original_url: shortUrl.originalUrl,
    short_url: shortUrl.shortUrl
  });
});

const getUrl = asyncHandler(async (req, res) => {
  let shortUrl = await ShortUrl.findOne({ shortUrl: req.params.id });
  let protocolRegex = /^http/;
  if (protocolRegex.test(shortUrl.originalUrl)) {
    res.redirect(shortUrl.originalUrl);
  } else {
    res.redirect('https://' + shortUrl.originalUrl);
  }
});

module.exports = {
  createUrl,
  getUrl
}