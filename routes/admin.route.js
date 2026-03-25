import express from 'express';
import { jwtAuthentication } from '../config/passport.js';
import { tagController, postController } from '../controllers/index.js';

const router = express.Router();

router.get('/tags', jwtAuthentication, tagController.getAllTags);
router.post('/posts', jwtAuthentication, postController.createPost);

export default router;
