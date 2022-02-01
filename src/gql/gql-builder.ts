import DirectivePlugin from '@pothos/plugin-directives';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import SchemaBuilder from '@pothos/core';
import type PothosSchemaTypes from '@pothos/core';
import { GQLContext } from '../app';
import { DirectiveNames } from './directives';
import ObjectFieldBuilder from '@pothos/core/lib/fieldUtils/object';

type DirectiveTypes = {
  [DirectiveNames.consoleLog]: {
    locations: 'FIELD_DEFINITION';
  };
};

type UserSchemaType = {
  Directives: DirectiveTypes;
  Context: GQLContext;
  DefaultFieldNullability: false;
};

export const builder = new SchemaBuilder<UserSchemaType>({
  plugins: [DirectivePlugin, SimpleObjectsPlugin],
});

// If you want to isolate a field out, you would use this type to get full typescripting info
export type PothosFieldType<ParentType> = ObjectFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<UserSchemaType>,
  ParentType
>;

// We create empty root query, mutation, and subscription
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});
