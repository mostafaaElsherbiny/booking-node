import bcrypt from 'bcrypt';

export default async function hashPassword(password): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}
