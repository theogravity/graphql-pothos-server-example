import { withFilter } from 'graphql-subscriptions';
import { builder } from '../../gql-builder';
import { BasePostEvent, IBasePostEvent, PostEventLabel } from './post-event.interface';
import { GQLContext } from '../../../app';
import { pubsub } from '../../../pubsub';

builder.subscriptionField('postEvents', (t) => {
  return t.field({
    type: IBasePostEvent,
    description: 'Events related to posts',
    args: {},
    subscribe: (_, {}, ctx: GQLContext, _info: any) => {
      const subscriptionResolver = generatePostEventSubscriptionResolver({ ctx });
      return subscriptionResolver(_, {}, ctx, _info) as any as AsyncIterable<unknown>;
    },
    resolve: async (payload, {}, context) => {
      return payload as BasePostEvent;
    },
  });
});

function generatePostEventSubscriptionResolver({ ctx }: { ctx: GQLContext }) {
  return withFilter(
    () => {
      return pubsub.asyncIterator(PostEventLabel);
    },
    async (event: BasePostEvent, {}, ctx: GQLContext) => {
      // Send to all connected users to this subscription
      return true;
    },
  );
}

export async function publishPostEvent(event: BasePostEvent, context: GQLContext) {
  await context.pubsub.publish(PostEventLabel, event);
}
