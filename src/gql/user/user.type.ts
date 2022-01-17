import { builder } from '../gql-builder';
import User from '../../db/models/User.model';
import { useLogDirective } from '../directives';
import { userPostsField } from './user.posts.field';

builder.objectType(User, {
  name: 'User',
  description: 'Blog user',
  fields: (t) => ({
    id: t.exposeInt('id', {
      directives: [useLogDirective()],
    }),
    name: t.exposeString('name'),
    // If your field may be a large implementation, we can separate it out to its own function
    posts: userPostsField(t),
  }),
});
