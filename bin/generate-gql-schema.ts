import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { builder } from '../src/gql/gql-builder';
import '../src/gql';
import { printSchema } from 'graphql';

const SCHEMA_OUT_DIR = 'gql-schema';
const SCHEMA_OUT_FILE = 'schema.graphql';

// Made it async in case we have promise-able items to call in the future
async function writeSchema() {
  const schema = builder.toSchema({})

  if (!existsSync(SCHEMA_OUT_DIR)) {
    mkdirSync(SCHEMA_OUT_DIR);
  }

  writeFileSync(join(__dirname, '..', SCHEMA_OUT_DIR, SCHEMA_OUT_FILE), printSchema(schema), 'utf8');
}

writeSchema().then(() => {
  console.log('Schema written to gql-schema/schema.graphql')
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(-1);
})
