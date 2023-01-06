module.exports = () => ({
  autoDetect: true,
  files: [
    './**/**/*.ts',
    { pattern: './**/**/*spec.*', ignore: true },
    { pattern: '**/node_modules/**', ignore: true },
  ],
  tests: ['./**/**/*spec.*', { pattern: '**/node_modules/**', ignore: true }],
});
