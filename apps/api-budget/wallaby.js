// process.env.DB_HOST = 'localhost';
// process.env.DB_USERNAME = 'postgres';
// process.env.DB_PASSWORD = 'postgres';
// process.env.DB_PORT = 5432;
process.env.NODE_ENV = 'test';
// process.env.DB_DATABASE = 'budget-management';
module.exports = () => ({
  autoDetect: true,
  files: [
    '**/*.ts',
    { pattern: '**/*spec*', ignore: true },
    { pattern: '**/*e2e*', ignore: true },
    { pattern: '**/node_modules/**', ignore: true },
  ],
  tests: [
    '**/*spec*',
    '**/*e2e*',
    { pattern: '**/node_modules/**', ignore: true },
  ],
});
