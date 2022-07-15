const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(`Error: ${err.message}`)
  //res.status(statusCode);
  res.json({
    error: err.message
  });
}

module.exports = { errorHandler };