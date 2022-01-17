import { init } from './app';

init({ gqlPort: 3000 })
  .then((server) => {
    console.log(`GraphQL server started on port 3000.\n`);
    console.log(`Endpoint: http://localhost:3000${server.graphqlPath}`);
    console.log(`Playground: http://localhost:3000/playground`);
    return server;
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
