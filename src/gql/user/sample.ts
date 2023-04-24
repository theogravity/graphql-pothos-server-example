import { builder } from '../gql-builder';

const SampleInput = builder.inputType('SampleInput', {
  fields: (t) => ({
    requiredField: t.string({
      required: true,
    }),
    optionalField: t.string({
      required: false,
    }),
  }),
});

builder.mutationField('sampleMutation', (t) => {
  return t.field({
    type: 'Boolean',
    args: {
      input: t.arg({
        required: true,
        type: SampleInput,
      }),
    },
    resolve: async (_, args) => {
      return sampleResolver(args.input);
    },
  });
});

const sampleResolver = ({
  requiredField,
  optionalField,
}: {
  requiredField: string;
  optionalField?: string;
}) => {
  console.log({ requiredField, optionalField });
  return true;
};