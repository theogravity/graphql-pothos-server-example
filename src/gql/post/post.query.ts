import { builder } from '../gql-builder';
import { GQLContext } from '../../app';
import Post from '../../db/models/Post.model';

builder.queryField('post', (t) => {
  return t.field({
    type: Post,
    args: {
      id: t.arg.id(),
    },
    description: 'Blog post',
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      if (!args.id) {
        return null;
      }

      return postQuery(args.id as number, context);
    },
  });
});

export function postQuery(id: number, context: GQLContext) {
  return context.dataSources.posts.getPostById(id as number);
}
