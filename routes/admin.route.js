import express from 'express';
import { jwtAuthentication } from '../config/passport.js';
import { validationMiddleware as validation } from '../middlewares/index.js';
import { tagController, postController } from '../controllers/index.js';

const { validateId, validateTagName, checkValidationResult } = validation;
const { getAllTags, deleteTag, createTag } = tagController;

const router = express.Router();

router.get('/tags', jwtAuthentication, getAllTags);
router.delete('/tags', jwtAuthentication, validateId, checkValidationResult, deleteTag);
router.post('/tags', jwtAuthentication, validateTagName, checkValidationResult, createTag);
router.post('/posts', jwtAuthentication, postController.createPost);

export default router;
