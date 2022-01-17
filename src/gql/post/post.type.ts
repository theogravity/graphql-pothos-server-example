import { builder } from '../gql-builder';
import Post from '../../db/models/Post.model';
import { GQLContext } from '../../app';
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
      nullable: true,
      description: 'Post author',
      resolve: (parent, args, context) => {
        return postAuthorResolver(parent.authorId, context);
      },
    }),
  }),
});

export function postAuthorResolver(authorId: number, context: GQLContext) {
  return context.dataSources.users.getUserById(authorId);
}
