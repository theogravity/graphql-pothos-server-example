import { BasePostEvent, IBasePostEvent, PostEventType } from './post-event.interface';
import { builder } from '../../gql-builder';

export class NewPostEvent extends BasePostEvent {
  id: number;
  title: string;

  constructor({ id, title }: { id: number; title: string }) {
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
    // This is the recommended approach to type things in isTypeOf
    // https://github.com/hayes/pothos/issues/336
    return (value as NewPostEvent).eventType === PostEventType.NewPost;
  },
  fields: (t) => ({
    id: t.exposeID('id', {
      description: 'Post id',
    }),
    title: t.exposeString('title', {
      description: 'Post title',
    }),
  }),
});
