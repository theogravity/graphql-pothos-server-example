import { builder } from '../gql-builder';
import { GQLContext } from '../../app';
import User from '../../db/models/User.model';

builder.queryField('users', (t) => {
  return t.field({
    type: [User],
    description: 'List of users',
    resolve: async (parent, args, context: GQLContext) => {
      return usersQuery(context);
    },
  });
});

export function usersQuery(context: GQLContext) {
  return context.dataSources.users.listUsers();
}
