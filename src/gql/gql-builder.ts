import SchemaBuilder from '@giraphql/core';
import { GQLContext } from '../app';

export const builder = new SchemaBuilder<{
  Context: GQLContext;
  DefaultFieldNullability: true;
}>({ defaultFieldNullability: true });
