const urlFormatRegex = /^\D{3,5}:\/\//;

const urlValidator = (req, res, next) => {
  console.log('Validation: Validating URL...');
  if (!req.body.url) {
    //res.status(400);
    console.log('Validation: Blank URL');
    throw new Error('invalid url');
  }
  if (!matchesFormat(req.body.url)) {
    //res.status(400);
    console.log('Validation: Wrong format');
    throw new Error('invalid url');
  }
  console.log('Validation: Validation complete');
  next();
};

const matchesFormat = (url) => {
  return urlFormatRegex.test(url);
}

module.exports = urlValidator;