/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'^@root/(.*)$': '<rootDir>/$1',
		'^@modules/(.*)$': '<rootDir>/src/app/$1',
		'^@utils/(.*)$': '<rootDir>/src/app/utils/$1',
	},
};
