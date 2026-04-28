import express from 'express';
import { postController } from '../controllers/index.js';
const router = express.Router();
import optionalAuthentication from '../middlewares/optionalAuthentication.js';

router.get('/', postController.getPublishedPosts);
router.get('/search', postController.getPostsByQuery);
router.get('/:slug', optionalAuthentication, postController.getPostWithComments);

export default router;
