/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__test__/**/*.[jt]s(x)?',
    '<rootDir>/src/**/*.(spec|test).[jt]s(x)?',
  ],
  transform: {
    '^.+[.]([cm]?[jt]s|[jt]sx?)$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
        },
      },
    ],
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{[jt]s(x)?,[cm][jt]s}',
    '!<rootDir>/node_modules/',
  ],
};
