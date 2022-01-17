import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../gql-client';
import { GQL_PATH, SERVER_PORT } from '../consts';

const client = new GraphQLClient(`http://localhost:${SERVER_PORT}${GQL_PATH}`);
const sdk = getSdk(client);

export function getGqlClient() {
  return sdk;
}
