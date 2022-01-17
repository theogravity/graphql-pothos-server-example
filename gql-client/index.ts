import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** The created user */
  user: User;
};

export type IBasePostEvent = {
  /** Event type */
  eventType: PostEventType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: CreateUserPayload;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};

/** When a new post is created */
export type NewPostEvent = IBasePostEvent & {
  __typename?: 'NewPostEvent';
  /** Event type */
  eventType: PostEventType;
  /** Post id */
  id: Scalars['ID'];
  /** Post title */
  title: Scalars['String'];
};

/** Blog post */
export type Post = {
  __typename?: 'Post';
  /** Post author */
  author: Maybe<User>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export enum PostEventType {
  NewPost = 'NewPost'
}

export type PostInput = {
  authorId: Scalars['Int'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Blog post */
  post: Maybe<Post>;
  /** List of posts */
  posts: Array<Post>;
  user: Maybe<User>;
  /** List of users */
  users: Array<User>;
};


export type QueryPostArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  id: InputMaybe<Scalars['ID']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Events related to posts */
  postEvents: IBasePostEvent;
};

/** Blog user */
export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  /** User's blog posts */
  posts: Array<Post>;
};

export type UserInput = {
  name: Scalars['String'];
};

export type UserFragment = { __typename?: 'User', id: number, name: string };

export type PostFragment = { __typename?: 'Post', content: string, created: string, id: string, title: string, author: { __typename?: 'User', id: number, name: string } | null };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserPayload', user: { __typename?: 'User', id: number, name: string } } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', content: string, created: string, id: string, title: string, author: { __typename?: 'User', id: number, name: string } | null } };

export type PostEventsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostEventsSubscription = { __typename?: 'Subscription', postEvents: { __typename?: 'NewPostEvent', eventType: PostEventType, id: string, title: string } };

export const UserFragmentDoc = gql`
    fragment user on User {
  id
  name
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  author {
    ...user
  }
  content
  created
  id
  title
}
    ${UserFragmentDoc}`;
export const CreateUserDocument = gql`
    mutation createUser($input: UserInput!) {
  createUser(input: $input) {
    user {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;
export const CreatePostDocument = gql`
    mutation createPost($input: PostInput!) {
  createPost(input: $input) {
    ...post
  }
}
    ${PostFragmentDoc}`;
export const PostEventsDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser');
    },
    createPost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPost');
    },
    postEvents(variables?: PostEventsSubscriptionVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostEventsSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostEventsSubscription>(PostEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'postEvents');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;