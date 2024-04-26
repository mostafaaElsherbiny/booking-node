import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import ApiResponse from '@modules/core/helpers/ApiResponse';
class AuthController {
	register = async (req: Request, res: Response) => {
		let user = await AuthService.register(req.body);
		return ApiResponse.success(res, user);
	};
	login = async (req: Request, res: Response) => {
		try {
			let { user, token } = await AuthService.login(req.body);

			return ApiResponse.success(res, { user, token });
		} catch (err: any) {
			return ApiResponse.error(res, err.message);
		}
	};
}

export default new AuthController();
