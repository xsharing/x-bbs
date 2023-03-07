import { encodeGlobalID } from '@pothos/plugin-relay';
import { CommentItem, CommentModel } from '../../models/comment';
import { builder } from '../builder';

export const CommentType = builder.node(CommentItem, {
  name: 'Comment',
  description: 'a comment',
  id: {
    resolve: (parent) => encodeGlobalID('Comment', parent.id),
  },
  fields: (t) => ({
    // id: t.globalID({
    //   resolve: (parent) => encodeGlobalID('Comment', parent.id),
    // }),
    threadId: t.string({
      resolve: (parent) => encodeGlobalID('Thread', parent.threadId),
    }),
    body: t.exposeString('body'),
  }),
  async loadOne(id) {
    return await CommentModel.get(id);
  },
});
