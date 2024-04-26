import User from '@modules/user/entities/User';
export const superAdminSeeder = async function () {
	try {

		const superAdmin = await User.findOne({ where: { email: 'admin@admin.com' } });

		if (superAdmin) {
			return;
		}
		await User.create({
			name: 'super admin',
			password: 'admin',
			email: 'admin@admin.com',
		}).save();
	} catch (err) {
		throw err;
	}
};
