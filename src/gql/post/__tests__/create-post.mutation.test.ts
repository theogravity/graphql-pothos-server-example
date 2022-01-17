/* eslint-env jest */

// we mock the context - we only want to test this function alone
// and not the calls it makes since we already have a test against the post datasource
// if we can trust that the post datasource has been unit tested properly
// then we don't need to have the datasource be tested here

import { createPostMutation } from '../create-post.mutation';
import Post from '../../../db/models/Post.model';
import { db } from '../../../db';
import { PostEventLabel, PostEventType } from '../../subscriptions/posts/post-event.interface';

beforeAll(async () => {
  // Init database / models
  await db.sync();
});

const mockContext: any = {
  // we only need to declare the items we only use in our function
  dataSources: {
    posts: {
      // The mutation calls createPost on dataSources, so we mock it
      createPost: jest.fn(),
    },
  },
  pubsub: {
    publish: jest.fn(),
  },
};

describe('create post mutation', () => {
  it('should create a post', async () => {
    // We can have the createPost mock return some data
    const mockPost = new Post();
    mockPost.id = 1;
    mockPost.authorId = 1;
    mockPost.title = 'test-title';
    mockPost.content = 'test-content';

    mockContext.dataSources.posts.createPost.mockResolvedValueOnce(mockPost);

    const result = await createPostMutation(
      {
        authorId: 1,
        title: 'test-title',
        content: 'test-content',
      },
      mockContext,
    );

    // check that at least the call to create the post was performed
    expect(mockContext.dataSources.posts.createPost).toBeCalledWith({
      authorId: 1,
      title: 'test-title',
      content: 'test-content',
    });

    // check that the subscription event was published
    expect(mockContext.pubsub.publish).toBeCalledWith(PostEventLabel, {
      id: 1,
      title: 'test-title',
      eventType: PostEventType.NewPost,
    });

    // The result of creating the post should give us back the post from the datasource call
    expect(result).toEqual(mockPost);
  });
});
