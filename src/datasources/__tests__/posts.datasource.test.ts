/* eslint-env jest */

import { PostsDatasource } from '../posts.datasource';
import { db } from '../../db';

const postsDatasource = new PostsDatasource();

beforeAll(async () => {
  // Init database / models
  await db.sync();
});

describe('Posts datasource', () => {
  it('should create a post', async () => {
    const post = await postsDatasource.createPost({
      // generally you'll do a random id for the author id here
      // so it doesn't conflict with other ids
      authorId: 1,
      title: 'test-title',
      content: 'test-content',
    });

    expect(post.id).toBeDefined();
  });
});
