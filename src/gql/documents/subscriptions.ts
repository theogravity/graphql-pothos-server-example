import gql from 'graphql-tag';

export const postSubscription = gql`
  subscription postEvents {
    postEvents {
      ... on NewPostEvent {
        eventType
        id
        title
      }
    }
  }
`;
