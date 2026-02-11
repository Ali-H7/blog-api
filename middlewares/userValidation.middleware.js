import { body } from 'express-validator';
import { userService } from '../services/index.js';

const userValidation = [
  body('userName')
    .notEmpty()
    .withMessage('User name cannot be empty')
    .trim()
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
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage(
      'Password should be a minimum of 8 characters ,and contain at least one uppercase, one lowercase, one number, and one special character.',
    ),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Second password field cannot be empty')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

export default userValidation;
