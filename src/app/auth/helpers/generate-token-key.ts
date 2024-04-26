import crypto from 'crypto';

const generateRandomString = (length: number): string => {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length);
};

const TOKEN_KEY = generateRandomString(32); // Generate a 32-character random string
console.log(TOKEN_KEY);
