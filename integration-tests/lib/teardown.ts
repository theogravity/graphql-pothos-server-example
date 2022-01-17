// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
module.exports = async function () {
  await global.__gqlServer__.stop();
};
