const dns = require('node:dns');

const urlValidator = (req, res, next) => {
  let address = dns.lookup(req.body.url, (err, address) => {
    if (err) {
      return null;
    }
    return address;
  });
  console.log(address);
  next();  
};

module.exports = urlValidator;