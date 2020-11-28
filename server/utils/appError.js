class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // when a new object is created, and the constructor function is called, that fun is not captured in the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
