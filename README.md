# giraphql GraphQL Server Example

This repo demonstrates how to use the graphQL code-based 
[giraphql](https://giraphql.com/) library to build queries,
mutations, and add directives. 

It also includes sample `jest` tests.

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

## Tests

Run tests with:

`$ yarn test`

## Directory structure

In the `src/` folder:

- `datasources/`: Apollo datasources for making db calls
- `db/`: Sequelize models
- `gql/`: `giraphql` definitions

The `gql/` folder is organized by domain. The reason I've done this vs organizing
by queries or mutations is the following:

- `giraphql` is a code-based gql definition library. Because it's code-based, you have a lot of control
on how to define your graphQL items. The trade-off is that it's more verbose. If you were to
shove everything under a single query or mutation file, it would be extremely difficult to navigate and read.
- Types themselves can have multiple resolvers that are independent of a query or mutation and can alone be quite verbose / complex.
- It's easier to find files that are specific to the function in an IDE. For example, the post creation mutation can be easily discovered in file search.
- All the code for that specific function lives in a single file makes it easier to bounce back and forth from vs jumping between files.

## Sample queries

Here's some queries to try out in the playground:

Create a user and post:

```gql
mutation {
  createUser(input: {
    name:"Theo Gravity"
  }) {
    user {
      id
    }
  }
  createPost(input:{
    authorId: 1
    title:"Test title",
    content:"Test post"
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
