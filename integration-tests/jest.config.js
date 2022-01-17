module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['../src/**/*.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/build', '/node_modules/'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  globalSetup: './lib/setup.ts',
  globalTeardown: './lib/teardown.ts',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
