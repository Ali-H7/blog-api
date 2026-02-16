import { body, param } from 'express-validator';
import { userService } from '../services/index.js';
import { validationResult, matchedData } from 'express-validator';
import { errors } from '../helpers/index.js';

const signup = [
  body('userName')
    .trim()
    .notEmpty()
    .withMessage('User name cannot be empty')
    .isString()
    .withMessage('User name must be a string')
    .isAlphanumeric('en-US')
    .withMessage('User name must contain only English letters and numbers')
    .isLength({ min: 2, max: 50 })
    .withMessage('User name must be between 2 and 50 characters')
    .bail()
    .custom(async (userName) => {
      const doesUserExist = await userService.findByUserName(userName);
      if (doesUserExist) {
        throw new Error('User name already in use');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isString()
    .withMessage('Password must be a string')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage(
      'Password should be a minimum of 8 characters ,and contain at least one uppercase, one lowercase, one number, and one special character.',
    ),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Second password field cannot be empty')
    .isString()
    .withMessage('Password must be a string')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

const validateTagName = body('name')
  .trim()
  .notEmpty()
  .withMessage('Tag name cannot be empty')
  .isString()
  .withMessage('Tag name must be a string')
  .isLength({ min: 2, max: 32 })
  .withMessage('Tag must between 2 and 32 characters');

const validateId = body('id')
  .trim()
  .notEmpty()
  .withMessage('Please provide the id to proceed with the request')
  .isString()
  .withMessage('Id must be a string')
  .isInt()
  .withMessage('Invalid id')
  .toInt();

const validateSlug = param('slug')
  .trim()
  .notEmpty()
  .withMessage('Slug is required')
  .isString()
  .withMessage('Slug must be a string')
  .toLowerCase()
  .isLength({ min: 2, max: 64 })
  .withMessage('Slug length is invalid');

function checkValidationResult(req, res, next) {
  const errorsObject = validationResult(req);
  if (!errorsObject.isEmpty()) {
    const error = new errors.ValidationError('Validation Error', 400);
    error.details = errorsObject.array({ onlyFirstError: true });
    throw error;
  }
  req.validatedData = matchedData(req);
  next();
}

export default { signup, validateSlug, validateTagName, validateId, checkValidationResult };
