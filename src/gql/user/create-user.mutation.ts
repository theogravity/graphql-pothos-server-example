import { builder } from '../gql-builder';
import { GQLContext } from '../../app';
import User from '../../db/models/User.model';

const UserInput = builder.inputType('UserInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});

// If we want to do a custom payload, use the simple-objects plugin
// to define fields without the need for a backing model
// https://pothos.com/plugins/simple-objects

const CreateUserPayload = builder.simpleObject('CreateUserPayload', {
  fields: (t) => ({
    user: t.field({
      type: User,
      description: 'The created user',
    }),
  }),
});

builder.mutationField('createUser', (t) => {
  return t.field({
    type: CreateUserPayload,
    nullable: false,
    args: {
      input: t.arg({ type: UserInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const user = await createUserMutation(args.input.name, context);

      return {
        user,
      };
    },
  });
});

export function createUserMutation(name: string, context: GQLContext) {
  return context.dataSources.users.createUser(name);
}
