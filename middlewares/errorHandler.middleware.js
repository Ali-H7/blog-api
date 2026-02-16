import 'dotenv/config';
import { Prisma } from '../generated/prisma/index.js';
import { errors } from '../helpers/index.js';

function handleDatabaseErrors(err, _req, res, next) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        err.message = `${err.meta.modelName} exist already in the database`;
        err.statusCode = 409;
        break;
      case 'P2025':
        err.message = `${err.meta.modelName} not found`;
        err.statusCode = 404;
        break;
    }
  }
  next(err);
}

function finalErrorHandler(err, _req, res, _next) {
  const isDevEnv = process.env.NODE_ENV === 'development';
  const statusCode = err.statusCode || 500;
  const errorStack = isDevEnv ? err.stack : null;
  const errorMessage = statusCode >= 500 && !isDevEnv ? 'Internal Server Error' : err.message;
  const validationErrors = err instanceof errors.ValidationError ? err.details : null;
  console.error(err);
  res.status(statusCode).json({
    error: errorMessage,
    ...(errorStack && { stack: errorStack }),
    ...(validationErrors && { validationErrors }),
  });
}

export default [handleDatabaseErrors, finalErrorHandler];
