const asyncHandler = require('express-async-handler');
const ShortUrl = require('../models/shortUrlModel');
const { updateCounter } = require('../config/counter');

const createUrl = asyncHandler(async (req, res) => {
  console.log(req.originalUrl);
  console.log('create: ' + req.body.url);
  let shortUrl = await ShortUrl.create({
    originalUrl: req.body.url,
    shortUrl: (await updateCounter('urlCounter')).lastValue
  })
  console.log('create: ' + shortUrl.shortUrl);
  res.json({
    original_url: shortUrl.originalUrl,
    short_url: shortUrl.shortUrl
  });
});

const getUrl = asyncHandler(async (req, res) => {
  if (req.params.id === 'undefined') {
    throw new Error('invalid url');
  }
  console.log(req.originalUrl);
  console.log('read: ' + req.params.id);
  let shortUrl = await ShortUrl.findOne({ shortUrl: req.params.id });
  console.log('read: ' + shortUrl.shortUrl);
  console.log('read: ' + shortUrl.originalUrl);
  res.redirect(shortUrl.originalUrl);
});

module.exports = {
  createUrl,
  getUrl
}