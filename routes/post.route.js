import express from 'express';
import { postController } from '../controllers/index.js';

const router = express.Router();

router.get('/', postController.findPublishedPostsAndTags);

export default router;
