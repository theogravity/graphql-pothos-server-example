import { builder } from '../../gql-builder';

export const PostEventLabel = 'POST_EVENT';

export enum PostEventType {
  NewPost = 'NewPost',
}

export const PostEventTypeGql = builder.enumType(PostEventType, {
  name: 'PostEventType',
});

export class BasePostEvent {
  eventType: PostEventType;

  constructor(eventType: PostEventType) {
    this.eventType = eventType;
  }
}

export const IBasePostEvent = builder.interfaceType(BasePostEvent, {
  name: 'IBasePostEvent',
  fields: (t) => ({
    eventType: t.field({
      type: PostEventTypeGql,
      description: 'Event type',
      resolve: (event) => {
        return event.eventType;
      },
    }),
  }),
});
