import { BasePostEvent, IBasePostEvent, PostEventType } from './post-event.interface';
import { builder } from '../../gql-builder';

export class NewPostEvent extends BasePostEvent {
  id: string;
  title: string;

  constructor({ id, title }: { id: string; title: string }) {
    super(PostEventType.NewPost);

    this.id = id;
    this.title = title;
  }
}

builder.objectType(NewPostEvent, {
  name: 'NewPostEvent',
  description: 'When a new post is created',
  interfaces: [IBasePostEvent],
  isTypeOf: (value) => {
    return value.eventType === PostEventType.NewPost;
  },
  fields: (t) => ({
    id: t.exposeString('id', {
      description: 'Post id',
    }),
    title: t.exposeString('title', {
      description: 'Post title',
    }),
  }),
});
