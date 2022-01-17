import { ApolloServer } from 'apollo-server-express';
import { createContext } from 'dataloader-sequelize';
import express from 'express';
import gqlPlayground from 'graphql-playground-middleware-express';

import { builder } from './gql/gql-builder';
import './gql';

import { Sequelize } from 'sequelize-typescript';
import { db } from './db';
import { PostsDatasource } from './datasources/posts.datasource';
import { UsersDatasource } from './datasources/users.datasource';
import { registerDirectives } from './gql/directives';

export interface GQLDataSources {
  posts: PostsDatasource;
  users: UsersDatasource;
}

export interface GQLContext {
  db: Sequelize;
  dataSources: GQLDataSources;
}

export async function init({
  port = 3000,
  graphqlPath = '/graphql',
}: {
  port?: number;
  graphqlPath?: string;
} = {}): Promise<ApolloServer> {
  let builderSchema = builder.toSchema({});

  builderSchema = registerDirectives(builderSchema);

  await db.sync();

  const dataSources: any = {
    posts: new PostsDatasource(),
    users: new UsersDatasource(),
  };

  const server = new ApolloServer({
    schema: builderSchema,
    dataSources: () => dataSources,
    context: () => {
      return {
        db: createContext(db),
      };
    },
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app, path: graphqlPath });

  app.get(
    '/playground',
    gqlPlayground({
      endpoint: graphqlPath,
    }),
  );

  app.listen(port);

  return server;
}
