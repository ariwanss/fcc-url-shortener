const urlFormatRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/ig;

const urlValidator = (req, res, next) => {
  if (!req.body.url) {
    res.status(400);
    throw new Error('invalid url');
  }
  if (!matchesFormat(req.body.url)) {
    res.status(400);
    throw new Error('invalid url');
  }
  next();
};

const matchesFormat = (url) => {
  return urlFormatRegex.test(url);
}

module.exports = urlValidator;