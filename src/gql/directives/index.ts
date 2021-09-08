import { GraphQLSchema } from 'graphql';
import { registerLogDirective } from './log.directive';

export enum DirectiveNames {
  consoleLog = 'consoleLog',
}

export function useLogDirective() {
  return {
    name: DirectiveNames.consoleLog,
    args: {},
  };
}

export function registerDirectives(schema: GraphQLSchema): GraphQLSchema {
  schema = registerLogDirective(schema);
  return schema;
}
