import 'dotenv/config';

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode >= 500 ? 'Internal Server Error' : err.message;
  const errorStack = process.env.NODE_ENV === 'development' ? err.stack : null;
  console.error(err);
  res.status(statusCode).json({ error: errorMessage, stack: errorStack });
}

export default errorHandler;
