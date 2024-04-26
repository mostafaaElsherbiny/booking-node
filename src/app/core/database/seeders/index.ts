import { connectToDB } from '../connection';
import { superAdminSeeder } from './superAdminSeeder';

async function seedDB() {
	try {
		await connectToDB();

		await superAdminSeeder();

		console.log('seeded Successfully 🚀');
	} catch (err: any) {
		throw err;
	}
}

seedDB()
	.then(() => console.log('done'))
	.catch((error) => {
		throw error;
	});
