# giraphql GraphQL Server Example

This repo demonstrates how to use the graphQL code-based 
[giraphql](https://giraphql.com/) library to build queries,
mutations, and add directives.

It is written using Typescript.

Components: 

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Sequelize ORM w/ sqlite](https://sequelize.org/master/)
- [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript) for defining `sequelize` models
- [dataloader-sequelize](https://github.com/mickhansen/dataloader-sequelize) as a [dataloader](https://www.apollographql.com/docs/apollo-server/data/data-sources/#using-with-dataloader) provider for `sequelize`
- [graphql-playground](https://github.com/graphql/graphql-playground)

## Installing

node.js v14 is the baseline requirement.

`$ yarn`

## Running

`$ yarn dev`

The server will start on port `3000`.

- GQL API: `http://localhost:3000/graphql`
- Playground: [http://localhost:3000/playground](http://localhost:3000/playground)

## Sample queries

Here's some queries to try out in the playground:

Create a user and post:

```gql
mutation {
  createUser(input: {
    name:"Theo Gravity"
  }) {
    id
  }
  createPost(input:{
    authorId: 1
    title:"Test title",
    content:"Test post"
  }) {
    id
  }
    createPost(input:{
    authorId: 1
    title:"Test title 2",
    content:"Test post 2"
  }) {
    id
  }
}
```

Query for user posts:

```gql
query {
  user(id: 1) {
    id
    name
    posts {
      id
      title
      content
      created
    }
  }
}
```

Get users:

```gql
query {
  users {
    id
    name
  }
}
```

Get posts:

```gql
query {
  posts {
    id
    title
    content
    created
    author {
      name
    }
  }
}
```
