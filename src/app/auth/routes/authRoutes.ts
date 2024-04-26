import express from 'express';
import AuthController from '../controllers/AuthController';
import validation from '../validations/auth';
import errorHandler from '@modules/core/middlewares/errorHandler';

const router = express.Router();

router.post('/', validation.login, AuthController.login);

export default router;
