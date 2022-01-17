// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { init } from '../../src/app';
import { GQL_PATH, SERVER_PORT } from '../consts';

module.exports = async () => {
  global.__gqlServer__ = await init({ gqlPort: SERVER_PORT, graphqlPath: GQL_PATH });
  console.log(`server started on ${SERVER_PORT}`);
};
