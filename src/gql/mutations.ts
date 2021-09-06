import { builder } from './gql-builder';
import User from '../db/models/User.model';
import Post from '../db/models/Post.model';

const UserInput = builder.inputType('UserInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});

const PostInput = builder.inputType('PostInput', {
  fields: (t) => ({
    authorId: t.int({ required: true }),
    title: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createUser: t.field({
      type: User,
      args: {
        input: t.arg({ type: UserInput, required: true }),
      },
      resolve: (root, args, context) => {
        return context.dataSources.users.createUser(args.input.name);
      },
    }),
    createPost: t.field({
      type: Post,
      args: {
        input: t.arg({ type: PostInput, required: true }),
      },
      resolve: (root, args, context) => {
        return context.dataSources.posts.createPost(args.input);
      },
    }),
  }),
});
