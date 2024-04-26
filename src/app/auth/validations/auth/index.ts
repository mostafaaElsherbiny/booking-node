import Joi from 'joi';
import { middleware } from '@modules/core/validator';

const login = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export default { login: middleware(login) };
