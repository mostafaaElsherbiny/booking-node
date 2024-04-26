import { httpStatus } from '../../core/constants/httpStatus';
import { ExceptionObj } from '../../core/types';

export const Not_Found: ExceptionObj = {
	httpStatus: httpStatus.NOT_FOUND,
	msg: 'event not found.',
};
