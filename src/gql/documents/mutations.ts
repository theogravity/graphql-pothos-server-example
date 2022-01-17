import gql from 'graphql-tag';
import { post, user } from './fragments';

export const createUser = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      user {
        ...user
      }
    }
  }

  ${user}
`;

export const createPost = gql`
  mutation createPost($input: PostInput!) {
    createPost(input: $input) {
      ...post
    }
  }

  ${post}
`;
