import { init } from './app';

init().catch((err) => {
  console.error(err);
  process.exit(-1);
});
