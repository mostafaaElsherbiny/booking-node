import Joi, { optional } from 'joi';
import { middleware } from '@modules/core/validator';
import Category from '../../enums/UserRoleEnum';

// date validate date greater than now
const create = Joi.object({
	name: Joi.string().required().max(100),
	date: Joi.date().min('now').required(),
	availableAttendeesCount: Joi.number().min(1).required(),
	description: Joi.string().required(),
	category: Joi.string()
		.valid(...Object.values(Category))
		.required(),
});


const index = Joi.object({
	name: Joi.string().optional(),
	startDate: Joi.date().optional(),
	endDate: Joi.date().optional(),
	category: Joi.string()
		.valid(...Object.values(Category))
		.optional(),
});
export default { create: middleware(create) , index: middleware(index,true)};
