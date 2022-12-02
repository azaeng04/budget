import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globals: {
    APP_PORT: 3333,
  },
  globalSetup: '<rootDir>/setup/global.setup.e2e.ts',
  globalTeardown: '<rootDir>/setup/global.teardown.e2e.ts',
};

export default config;
