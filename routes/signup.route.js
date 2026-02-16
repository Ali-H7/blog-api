import express from 'express';
import { validationMiddleware as validation } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';

const router = express.Router();

router.post('/', validation.signup, validation.checkValidationResult, userController.signup);

export default router;
