import express from 'express';
import { tagController } from '../controllers/index.js';
import { validationMiddleware as validation } from '../middlewares/index.js';
const { validateId, validateTagName, validateSlug, checkValidationResult } = validation;
const { getTagWithPublishedPosts, getTagsWithPostCount, createTag, updateTag, deleteTag } = tagController;

const router = express.Router();

router.get('/:slug', validateSlug, checkValidationResult, getTagWithPublishedPosts);
router.get('/', getTagsWithPostCount);
router.delete('/', validateId, checkValidationResult, deleteTag);
router.post('/', validateTagName, checkValidationResult, createTag);
router.put('/', validateId, validateTagName, checkValidationResult, updateTag);
export default router;
