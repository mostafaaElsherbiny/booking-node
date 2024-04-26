import express, { Application } from 'express';

import 'reflect-metadata';
import { loadApp } from '@modules/core/providers/appServiceProvider';
import http from 'http';

const app: Application = express();

loadApp(app)
	.then(() => {
		const PORT: number = parseInt(process.env.PORT as string);

		const server = http.createServer(app);

		server.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.then(() => {
		console.info('App loaded successfully');
	});

