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
    { pattern: '**/*spec.ts', ignore: true },
    { pattern: '**/*e2e-spec.ts', ignore: true },
    { pattern: '**/app-budget-e2e/**/*.*', ignore: true },
    { pattern: '**/*e2e.ts', ignore: true },
    { pattern: '**/node_modules/**/*.*', ignore: true },
    { pattern: '**/dist/**/*.*', ignore: true },
  ],
  tests: [
    '**/*.spec.ts',
    '**/*e2e.ts',
    { pattern: '**/node_modules/**', ignore: true },
    { pattern: '**/dist/**/*.*', ignore: true },
  ],
});
