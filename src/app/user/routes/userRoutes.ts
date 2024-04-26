import express from 'express';
import UserController from '../controllers/UserController';
import validation from '../validations/user';

const router = express.Router();

router.post('/', validation.create, UserController.store);

export { router as userRoutes };
