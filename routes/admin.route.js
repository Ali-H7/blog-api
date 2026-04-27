import express from 'express';
import { jwtAuthentication } from '../config/passport.js';
import checkIfAdmin from '../middlewares/checkIfAdmin.js';
import { validationMiddleware as validation } from '../middlewares/index.js';
import { tagController, postController, userController, commentController } from '../controllers/index.js';

const { validateId, validateTagName, checkValidationResult } = validation;
const { getAllTags, deleteTag, createTag } = tagController;

const router = express.Router();

router.get('/tags', jwtAuthentication, checkIfAdmin, getAllTags);
router.delete('/tags', jwtAuthentication, checkIfAdmin, validateId('id'), checkValidationResult, deleteTag);
router.delete(
  '/comments',
  jwtAuthentication,
  checkIfAdmin,
  validateId('id'),
  checkValidationResult,
  commentController.deleteComment,
);
router.post('/tags', jwtAuthentication, checkIfAdmin, validateTagName, checkValidationResult, createTag);
router.post('/posts', jwtAuthentication, checkIfAdmin, postController.createPost);
router.put('/request-role', jwtAuthentication, userController.updateRole);

export default router;
