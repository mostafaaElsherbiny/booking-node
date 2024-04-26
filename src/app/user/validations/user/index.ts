import Joi from 'joi';
import { middleware } from '@modules/core/validator';

const create = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export default { create: middleware(create) };
