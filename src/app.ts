import { ApolloServer } from 'apollo-server-express';
import { createContext } from 'dataloader-sequelize';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import gqlPlayground from 'graphql-playground-middleware-express';

import { builder } from './gql/gql-builder';
import './gql';

import { Sequelize } from 'sequelize-typescript';
import { db } from './db';
import { PostsDatasource } from './datasources/posts.datasource';
import { UsersDatasource } from './datasources/users.datasource';
import { registerDirectives } from './gql/directives';
import { PubSub } from 'graphql-subscriptions';
import { pubsub } from './pubsub';

export interface GQLDataSources {
  posts: PostsDatasource;
  users: UsersDatasource;
}

export interface GQLContext {
  db: Sequelize;
  dataSources: GQLDataSources;
  pubsub: PubSub;
}

export async function init({
  gqlPort = 3000,
  graphqlPath = '/graphql',
}: {
  gqlPort?: number;
  graphqlPath?: string;
} = {}): Promise<ApolloServer> {
  let builderSchema = builder.toSchema({});

  builderSchema = registerDirectives(builderSchema);

  await db.sync();

  const dataSources: any = {
    posts: new PostsDatasource(),
    users: new UsersDatasource(),
  };

  const apolloServer = new ApolloServer({
    schema: builderSchema,
    dataSources: () => dataSources,
    context: () => {
      return {
        db: createContext(db),
        pubsub,
      };
    },
  });

  await apolloServer.start();

  const app = express();
  apolloServer.applyMiddleware({ app, path: graphqlPath });

  app.get(
    '/playground',
    gqlPlayground({
      endpoint: graphqlPath,
    }),
  );

  const server = app.listen(gqlPort, () => {
    const wsServer = new WebSocketServer({
      server,
      path: graphqlPath,
    });

    useServer({ schema: builderSchema }, wsServer);
  });

  return apolloServer;
}
