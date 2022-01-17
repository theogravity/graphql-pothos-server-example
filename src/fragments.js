import gql from 'graphql-tag';

export const user = gql`
  fragment user on User {
    id
    name
  }
`;

export const post = gql`
  fragment post on Post {
    author {
      ...user
    }
    content
    created
    id
    title
  }

  ${user}
`;

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
