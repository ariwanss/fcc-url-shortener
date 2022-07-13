const mongoose = require('mongoose');

const shortUrlSchema =  mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);