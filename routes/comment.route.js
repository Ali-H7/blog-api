import express from 'express';
import { commentController } from '../controllers/index.js';
import { validationMiddleware as validation } from '../middlewares/index.js';
import optionalAuthentication from '../middlewares/optionalAuthentication.js';

const { validateId, validateComment, checkValidationResult } = validation;

const router = express.Router();

router.post(
  '/',
  optionalAuthentication,
  [validateId('postId'), validateComment, checkValidationResult],
  commentController.createComment,
);

export default router;
