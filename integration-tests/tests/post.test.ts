/* eslint-env jest */
import { nanoid } from 'nanoid';
import { getGqlClient, subscribe } from '../lib/client';
import { postSubscription } from '../../src/gql/documents/subscriptions';
import { PostEventType } from '../../gql-schema/gql-types';

describe('post tests', () => {
  it('should create new post', async () => {
    const client = getGqlClient();
    const subscription = subscribe(postSubscription);
    const name = nanoid();
    const {
      createUser: { user },
    } = await client.createUser({
      input: {
        name,
      },
    });

    const { createPost } = await client.createPost({
      input: {
        authorId: user.id,
        title: 'test post',
        content: 'test content',
      },
    });

    subscription.unsubscribe();

    expect(subscription.events.length).toBe(1);
    expect(subscription.events[0]).toEqual(
      expect.objectContaining({
        eventType: PostEventType.NewPost,
        title: 'test post',
      }),
    );
    expect(createPost.id).toBeDefined();
    expect(createPost.title).toBe('test post');
  });
});
