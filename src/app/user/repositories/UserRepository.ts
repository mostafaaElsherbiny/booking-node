import User from '../entities/User';
import { Already_Exists } from '../errors/errors';

export type ICreateUser = {
	name: string;
	email: string;
	password: string;
};

class UserRepository {
	create = async (data: ICreateUser) => {
		const user = await User.findOne({ email: data.email });
		if (user) {
			throw Already_Exists;
		}
		return await User.create(data).save();
	};
}

export default new UserRepository();
