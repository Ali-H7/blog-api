import express from 'express';
import { postController } from '../controllers/index.js';

const router = express.Router();

router.get('/', postController.getPublishedPostsAndTags);
router.get('/posts/:slug', postController.getPostWithComments);

export default router;
