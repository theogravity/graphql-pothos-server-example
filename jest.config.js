module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/build',
    '/node_modules/'
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  }
}
