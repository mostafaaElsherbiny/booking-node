import _ from 'lodash';
import validator from './validator';

import { Validation_Error } from '../error-handlers/exceptions/generic';
import { NextFunction, Response } from 'express';

export default (Schema: any, query: boolean = false) =>
	(req: any, res: Response, next: NextFunction) => {
		if (req.isSocket) {
			req.query = _.omit(req.handshake.query, ['EIO', 'transport']);
			req.params = { id: req.nsp.name.split('/')[2] };
		} else if (!req.files) req.files = {};

		if (query) {
			const result: any = validator(Schema, { ...req, ...req.query });
			if (result.errors) return next(Validation_Error(result.errors));
			req.params = result.params;
			req.query = result.query;
		}
		const body = req.body;

		if (req.file) {
			body.file = req.file;
		}

		const result: any = validator(Schema, { ...req, ...body });

		if (result.errors) return next(Validation_Error(result.errors));

		req.params = result.params;
		req.query = result.query;
		req.body = result.body;

		next();
	};
