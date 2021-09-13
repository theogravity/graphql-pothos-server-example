import DirectivePlugin from '@giraphql/plugin-directives';
import SimpleObjectsPlugin from '@giraphql/plugin-simple-objects';
import SchemaBuilder from '@giraphql/core';
import { GQLContext } from '../app';
import { DirectiveNames } from './directives';

type DirectiveTypes = {
  [DirectiveNames.consoleLog]: {
    locations: 'FIELD_DEFINITION';
  };
};

export const builder = new SchemaBuilder<{
  Directives: DirectiveTypes;
  Context: GQLContext;
  DefaultFieldNullability: true;
}>({
  defaultFieldNullability: true,
  plugins: [DirectivePlugin, SimpleObjectsPlugin],
});

// We create empty root query and mutation
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
builder.queryType({});
builder.mutationType({});
