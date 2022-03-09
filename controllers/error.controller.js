const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { globalErrorHandler };
