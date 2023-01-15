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
