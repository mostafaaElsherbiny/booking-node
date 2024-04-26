import { Request, Response } from 'express';
import ApiResponse from '@modules/core/helpers/ApiResponse';
import UserRepository from '../repositories/UserRepository';

class UserController {
	store = async (req: Request, res: Response) => {
		let preparedData = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		};

		let data = await UserRepository.create(preparedData);

		ApiResponse.success(res, data);
	};
}

export default new UserController();
