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
