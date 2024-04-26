import { httpStatus } from '../../core/constants/httpStatus';
import { ExceptionObj } from '../../core/types';

export const Not_Found: ExceptionObj = {
	httpStatus: httpStatus.NOT_FOUND,
	msg: 'user not found.',
};
export const Already_Exists: ExceptionObj = {
	httpStatus: httpStatus.CONFLICT,
	msg: 'User already exists.',
};
