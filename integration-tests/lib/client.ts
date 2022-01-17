import { Client, createClient } from 'graphql-ws';
import * as ws from 'ws';
import * as Crypto from 'crypto';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../gql-client';
import { GQL_PATH, SERVER_PORT } from '../consts';
import { DocumentNode } from 'graphql';

const client = new GraphQLClient(`http://localhost:${SERVER_PORT}${GQL_PATH}`);
const sdk = getSdk(client);

const subscriptionClient = createClient({
  url: `ws://localhost:${SERVER_PORT}${GQL_PATH}`,
  webSocketImpl: ws.WebSocket,
  /**
   * Generates a v4 UUID to be used as the ID.
   * Reference: https://gist.github.com/jed/982883
   */
  generateID: () =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (Crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16),
    ),
});

class Subscription {
  events: Array<Record<string, any>>;
  private subscriptionClient: Client;
  private subscriptionName: string;
  unsubscribe: () => void;

  constructor(client: Client, gql: DocumentNode) {
    const { query, subscriptionName } = getGqlString(gql);

    this.subscriptionName = subscriptionName;
    this.events = [];
    this.subscriptionClient = client;
    this.unsubscribe = subscriptionClient.subscribe(
      {
        query,
      },
      {
        next: this.next,
        error: this.error,
        complete: this.complete,
      },
    );
  }

  private complete = () => {
    this.unsubscribe();
  };

  private next = (event: Record<string, any>) => {
    // events come down in the format of
    // { data: <subscriptionName> : event }
    this.events.push(event.data[this.subscriptionName]);
  };

  private error = (err: Error) => {
    console.error(err);
    throw err;
  };
}

export function getGqlClient() {
  return sdk;
}

function getGqlString(doc: DocumentNode): { query: string; subscriptionName: string } {
  if (!doc.loc) {
    throw new Error('gql not a fragment type');
  }

  const definition = doc.definitions[0];

  return {
    query: doc.loc?.source.body,
    subscriptionName: 'name' in definition && definition.name ? definition.name.value : '',
  };
}

export function subscribe(gql: DocumentNode) {
  return new Subscription(subscriptionClient, gql);
}
