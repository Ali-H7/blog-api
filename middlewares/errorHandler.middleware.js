import 'dotenv/config';
import camelCase from 'camelcase';
import { createError } from '../helpers/index.js';
import { Prisma } from '../generated/prisma/index.js';

function handleDatabaseErrors(err, _req, res, next) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const errorMessages = {
        tag: 'There already a tag with this name',
        generic: 'Duplicate entry: this value already exists in the database.',
      };
      const model = camelCase(err.meta.modelName);
      const message = errorMessages[model] || errorMessages.generic;
      const newErr = createError(message, 409);
      next(newErr);
    }
  }
  next(err);
}

function finalErrorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const errorStack = process.env.NODE_ENV === 'development' ? err.stack : null;
  const errorMessage = statusCode >= 500 ? 'Internal Server Error' : err.message;
  res.status(statusCode).json({ error: errorMessage, stack: errorStack });
}

export default [handleDatabaseErrors, finalErrorHandler];
