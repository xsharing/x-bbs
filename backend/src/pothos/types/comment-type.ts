import { encodeGlobalID } from '@pothos/plugin-relay';
import { CommentItem } from '../../models/comment';
import { builder } from '../builder';

export const CommentType = builder.objectType(CommentItem, {
  name: 'Comment',
  description: 'a comment',
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => encodeGlobalID('Comment', parent.id),
    }),
    threadId: t.string({
      resolve: (parent) => encodeGlobalID('Thread', parent.threadId),
    }),
    body: t.exposeString('body'),
  }),
});
