import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { Internal_Server_Error, JSON_Parsing_Error } from '../error-handlers/exceptions/generic';
const errorHandler = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array()[0].msg });
	}
	next();
};

export const defaultHandler = async (err: any, req: Request, res: Response, next: Function) => {

	let error = err.msg ? err : Internal_Server_Error;

	//JSON parse errors
	if (err.type == 'entity.parse.failed') error = JSON_Parsing_Error;

	const { httpStatus, ...body } = error;

	if (httpStatus === 500) console.error('Error 5xx:', error);
	res.status(httpStatus).json(body);
};

export default errorHandler;
