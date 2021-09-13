import { builder } from '../gql-builder';
import { GQLContext } from '../../app';
import Post from '../../db/models/Post.model';

builder.queryField('posts', (t) => {
  return t.field({
    type: [Post],
    description: 'List of posts',
    resolve: async (parent, args, context: GQLContext) => {
      return postsQuery(context);
    },
  });
});

export function postsQuery(context: GQLContext) {
  return context.dataSources.posts.listPosts();
}
