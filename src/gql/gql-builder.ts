import DirectivePlugin from '@giraphql/plugin-directives';
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
  plugins: [DirectivePlugin],
});
