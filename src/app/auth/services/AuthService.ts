import User from '@modules/user/entities/User';
import bcrypt from 'bcrypt';
import generateToken from '../helpers/generate-token';
import Token from '@modules/user/entities/Token';
class AuthService {
	async register(data: { email: string; password: string; roles: string[] }) {
		let userExists = await User.findOne({
			where: [{ email: data.email }],
		});

		if (userExists) {
			throw new Error('User already exists');
		}

		let user = await User.create(data).save();

		return user;
	}
	async login(data: { email: string; password: string }) {
		const user = await User.findOne({
			where: [{ email: data.email }],
		});

		if (user && (await bcrypt.compare(data.password, user.password))) {
			let token = generateToken({ id: user.id, name: user.name, roles: user.roles });

			await Token.create({ token, user }).save();

			return { user, token };
		}
		throw new Error('Invalid Credentials');
	}
}
export default new AuthService();
