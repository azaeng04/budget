module.exports = async function (_, _projectConfig) {
  await globalThis.APP.close();
};
