module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',
    '!src/loaders/**',
    '!src/models/**',
    '!src/openapi/**',
    '!src/routes/**',
  ],
  coverageDirectory: 'coverage',
};
