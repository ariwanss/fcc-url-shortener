const logRequest = (req, res, next) => {
  console.log(`\n${req.method}\t${req.originalUrl}\t\t${(new Date()).getTime()}`);
  console.log(`body: ${JSON.stringify(req.body)}`)
  next();
}

module.exports = logRequest;