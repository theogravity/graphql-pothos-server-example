import Post from '../../db/models/Post.model';
import { PothosFieldType } from '../gql-builder';
import User from '../../db/models/User.model';

// This is an example of splitting out a field to its own file
// in the event the field definition itself is pretty large
export function userPostsField(t: PothosFieldType<User>) {
  return t.field({
    type: [Post],
    description: `User's blog posts`,
    resolve: async (parent, args, context) => {
      return context.dataSources.posts.getPostsByAuthorId(parent.id);
    },
  });
}
