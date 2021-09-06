import { builder } from '../gql-builder';
import Post from '../../db/models/Post.model';
import User from '../../db/models/User.model';

builder.objectType(Post, {
  name: 'Post',
  description: 'Blog post',
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
    created: t.string({
      resolve: (parent) => {
        return parent.createdAt.toString();
      },
    }),
    author: t.field({
      type: User,
      description: 'Post author',
      resolve: (parent, args, context) => {
        return context.dataSources.users.getUserById(parent.authorId);
      },
    }),
  }),
});
