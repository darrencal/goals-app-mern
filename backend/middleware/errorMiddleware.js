const errorHandler = (err, req, res, next) => {
  if (!res.statusCode) {
    res.status(500);
  }

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
