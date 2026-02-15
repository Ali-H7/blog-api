import express from 'express';
import { tagController } from '../controllers/index.js';

const router = express.Router();

router.get('/:slug', tagController.getPostsByTag);
router.delete('/', tagController.deleteTag);
router.post('/', tagController.createTag);
router.put('/', tagController.updateTag);
export default router;
