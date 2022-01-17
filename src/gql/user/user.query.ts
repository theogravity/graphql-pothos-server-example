import { builder } from '../gql-builder';
import { GQLContext } from '../../app';
import User from '../../db/models/User.model';

builder.queryField('user', (t) => {
  return t.field({
    type: User,
    args: {
      id: t.arg.id(),
    },
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      if (!args.id) {
        return null;
      }

      return queryUser(args.id as number, context);
    },
  });
});

export function queryUser(id: number, context: GQLContext) {
  // Sequelize autoincrement id by default is a number
  return context.dataSources.users.getUserById(id);
}
