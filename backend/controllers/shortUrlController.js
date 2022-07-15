const asyncHandler = require('express-async-handler');
const ShortUrl = require('../models/shortUrlModel');
const { updateCounter, resetCounter } = require('../config/counter');

const createUrl = asyncHandler(async (req, res) => {
  console.log('Post: Creating ShortUrl...');
  let shortUrl = await ShortUrl.create({
    originalUrl: req.body.url,
    shortUrl: (await updateCounter('urlCounter')).lastValue
  });
  console.log(`Post: Created ShortUrl {original_url: ${shortUrl.originalUrl}, short_url: ${shortUrl.shortUrl}}`);
  res.json({
    original_url: shortUrl.originalUrl,
    short_url: shortUrl.shortUrl
  });
});

const getUrl = asyncHandler(async (req, res) => {
  console.log('Get: Finding URL...')
  let shortUrl = await ShortUrl.findOne({ shortUrl: Number(req.params.id) });
  if (!shortUrl) {
    throw new Error('invalid url');
  }
  console.log('Get: Found URL')
  res.redirect(shortUrl.originalUrl);
});

const getUrls = asyncHandler(async (req, res) => {
  let urls = (await ShortUrl.find()).map(doc => ({original_url: doc.originalUrl, short_url: doc.shortUrl}));
  res.json(urls);
});

const deleteAll = asyncHandler(async (req, res) => {
  let count = await ShortUrl.deleteMany();
  let counter = await resetCounter('urlCounter');
  console.log(`Counter reset, lastValue: ${counter.lastValue}`);
  res.json(count);
})

module.exports = {
  createUrl,
  getUrl,
  getUrls,
  deleteAll
}