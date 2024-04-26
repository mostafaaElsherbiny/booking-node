import express, { Application, Request, Response } from 'express';
import 'express-async-errors';
import { userRoutes } from '@modules/user/routes/userRoutes';
import path from 'path';
import authRoutes from '@modules/auth/routes/authRoutes';
import verifyToken from '@modules/auth/middlewares/auth';
import { defaultHandler } from '../middlewares/errorHandler';
import { eventRoutes } from '../../event/routes/eventRoutes';

const modules = [
	{
		prefix: '/users',
		paths: userRoutes,
		middlewares: [verifyToken],
	},
	{
		prefix: '/events',
		paths: eventRoutes,
		middlewares: [verifyToken],
	},
	{
		prefix: '/auth',
		paths: authRoutes,
		middlewares: [],
	},
];
const loadAppRoutes = (app: Application) => {
	app.use(express.json());

	app.use(express.urlencoded({ extended: true }));

	modules.forEach((module) => {
		const { prefix, middlewares, paths } = module;
		if (middlewares && middlewares.length > 0) {
			app.use(prefix, middlewares, paths);
		} else {
			app.use(prefix, paths);
		}
	});

	app.use(defaultHandler);

	app.get('/', (req: Request, res: Response): void => {
		res.send('Hello World!');
	});

	//load files route
	app.use('/assets', express.static(path.join('assets/uploads')));
};
export { loadAppRoutes };
