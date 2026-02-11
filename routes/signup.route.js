import express from 'express';
import { userValidationMiddleware } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';

const router = express.Router();

router.post('/', userValidationMiddleware, userController.signup);

export default router;
