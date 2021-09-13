import { builder } from '../gql-builder';
import { GQLContext } from '../../app';
import Post from '../../db/models/Post.model';

const PostInput = builder.inputType('PostInput', {
  fields: (t) => ({
    authorId: t.int({ required: true }),
    title: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField('createPost', (t) => {
  return t.field({
    // We feed in the Post model, which giraphql will map to the Post type we created in post.type.ts
    type: Post,
    args: {
      input: t.arg({ type: PostInput, required: true }),
    },
    resolve: (root, args, context) => {
      return createPostMutation(args.input, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export function createPostMutation(
  { authorId, title, content }: { authorId: number; title: string; content: string },
  context: GQLContext,
): Promise<Post> {
  return context.dataSources.posts.createPost({
    authorId,
    title,
    content,
  });
}
