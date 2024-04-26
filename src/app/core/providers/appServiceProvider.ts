import dotenv from 'dotenv';
import { Application } from 'express';
import { connectToDB } from '../database/connection';
import { loadAppMiddlewares } from './middlewareServiceProvider';
import { loadAppRoutes } from './routeServiceProvider';
const loadApp = async (app: Application) => {
	dotenv.config();
	if (!process.env.PORT) {
		process.exit(1);
	}
	loadAppMiddlewares(app);
	loadAppRoutes(app);
	await connectToDB();
};
export { loadApp };
