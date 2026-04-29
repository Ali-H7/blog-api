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
router.post('/tags', jwtAuthentication, checkIfAdmin, validateTagName, checkValidationResult, createTag);

router.get('/posts', jwtAuthentication, checkIfAdmin, postController.getAllPosts);
router.put('/posts', jwtAuthentication, checkIfAdmin, postController.updatePost);
router.post('/posts', jwtAuthentication, checkIfAdmin, postController.createPost);
router.delete(
  '/posts',
  jwtAuthentication,
  checkIfAdmin,
  validateId('id'),
  checkValidationResult,
  postController.deletePost,
);

router.put('/request-role', jwtAuthentication, userController.updateRole);

router.delete(
  '/comments',
  jwtAuthentication,
  checkIfAdmin,
  validateId('id'),
  checkValidationResult,
  commentController.deleteComment,
);
export default router;
