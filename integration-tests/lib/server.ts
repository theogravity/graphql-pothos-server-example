/* eslint-env jest */

import { init } from '../../src/app';
import { ApolloServer } from 'apollo-server-express';
import { GQL_PATH, SERVER_PORT } from '../consts';

let server: ApolloServer;
beforeAll(async () => {
  server = await init({ gqlPort: SERVER_PORT, graphqlPath: GQL_PATH });
  console.log(`server started on ${SERVER_PORT}`);
});

afterAll(async () => {
  await server.stop();
});
