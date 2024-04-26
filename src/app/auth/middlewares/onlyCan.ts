import { Request, Response, NextFunction } from 'express';
import { getUserFromRequestToken } from './auth';
import User from '@modules/user/entities/User';

const onlyCan = (rolesCan: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			let { userId } = await getUserFromRequestToken(req);
			let user = await User.findOne(userId);
			let roles = user.roles;
			let can = roles.some((element) => rolesCan.includes(element));
			if (!can) throw Error('you are not authorized to access this route');
		} catch (err: any) {
			return res.status(401).send({ message: err.message });
		}
		return next();
	};
};

export default onlyCan;
