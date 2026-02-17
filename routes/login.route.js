import express from 'express';
import { validationMiddleware as validation } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';
import { localAuthentication } from '../config/passport.js';

const router = express.Router();

router.post('/', validation.login, validation.checkValidationResult, localAuthentication, userController.login);

export default router;
