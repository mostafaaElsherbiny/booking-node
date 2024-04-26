import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import multer from 'multer';
const loadAppMiddlewares = (app: Application) => {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'assets/');
		},
		filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now());
		},
	});

	const upload = multer({ storage, dest: 'assets/' });

	app.use(cors());
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(upload.single('file'));
};
export { loadAppMiddlewares };
