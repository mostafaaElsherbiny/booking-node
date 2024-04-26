import { httpStatus } from '../../constants/httpStatus';
import { ExceptionObj } from '../../types/exception.type';

export const Internal_Server_Error: ExceptionObj = {
	httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
	msg: 'Internal server error.',
};
export const JSON_Parsing_Error: ExceptionObj = {
	httpStatus: httpStatus.BAD_REQUEST,
	msg: 'JSON parsing error.',
};
export const Database_Conflict: ExceptionObj = {
	httpStatus: httpStatus.BAD_REQUEST,
	msg: `Duplication conflict.`,
};
export const Validation_Error = (args: any): ExceptionObj => ({
	httpStatus: httpStatus.BAD_REQUEST,
	msg: 'Request validation error',
	args,
});
