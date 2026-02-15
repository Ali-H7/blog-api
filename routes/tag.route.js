import express from 'express';
import { tagController } from '../controllers/index.js';

const router = express.Router();

router.get('/:slug', tagController.getPostsByTag);
export default router;
