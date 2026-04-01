import express from 'express';
import { postController } from '../controllers/index.js';
const router = express.Router();

router.get('/', postController.getPublishedPosts);
router.get('/search', postController.getPostsByQuery);
router.get('/:slug', postController.getPostWithComments);

export default router;
