import { builder } from '../gql-builder';
import User from '../../db/models/User.model';
import { useLogDirective } from '../directives';
import Post from '../../db/models/Post.model';

builder.objectType(User, {
  name: 'User',
  description: 'Blog user',
  fields: (t) => ({
    id: t.exposeID('id', {
      directives: [useLogDirective()],
    }),
    name: t.exposeString('name'),
    posts: t.field({
      type: [Post],
      description: `User's blog posts`,
      resolve: async (parent, args, context) => {
        return context.dataSources.posts.getPostsByAuthorId(parent.id);
      },
    }),
  }),
});
