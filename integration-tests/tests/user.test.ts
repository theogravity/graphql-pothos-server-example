/* eslint-env jest */
import { nanoid } from 'nanoid';
import { getGqlClient } from '../lib/client';

describe('user tests', () => {
  it('should create a user', async () => {
    const client = getGqlClient();
    const name = nanoid();
    const result = await client.createUser({
      input: {
        name,
      },
    });

    expect(result.createUser.user.id).toBeDefined();
    expect(result.createUser.user.name).toBe(name);
  });
});
