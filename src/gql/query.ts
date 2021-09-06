import { builder } from './gql-builder';
import { GQLContext } from '../app';
import User from '../db/models/User.model';
import Post from '../db/models/Post.model';

builder.queryType({
  fields: (t) => ({
    user: t.field({
      type: User,
      args: {
        id: t.arg.id(),
      },
      resolve: async (parent, args, context: GQLContext) => {
        if (!args.id) {
          return null;
        }

        // Sequelize autoincrement id by default is a number
        return context.dataSources.users.getUserById(args.id as number);
      },
    }),
    users: t.field({
      type: [User],
      description: 'List of users',
      resolve: async (parent, args, context: GQLContext) => {
        return context.dataSources.users.listUsers();
      },
    }),
    post: t.field({
      type: Post,
      args: {
        id: t.arg.id(),
      },
      description: 'Blog post',
      resolve: async (parent, args, context: GQLContext) => {
        if (!args.id) {
          return null;
        }

        return context.dataSources.posts.getPostById(args.id as number);
      },
    }),
    posts: t.field({
      type: [Post],
      description: 'List of posts',
      resolve: async (parent, args, context: GQLContext) => {
        return context.dataSources.posts.listPosts();
      },
    }),
  }),
});
