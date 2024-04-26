import jwt from 'jsonwebtoken';
type IUser = {
	id: number;
	name: string;
	roles: string[];

};
const generateToken = (user: IUser) => {
	const token = jwt.sign(
		{
			userId: user.id,
			username: user.name,
			roles: user.roles,
		},
		process.env.TOKEN_KEY as string,
		{
			expiresIn: '7d',
		}
	);
	return token;
};

export default generateToken;
