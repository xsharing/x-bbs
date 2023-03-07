import { encodeGlobalID } from '@pothos/plugin-relay';
import { ThreadItem } from '../../models';
import { builder } from '../builder';
import { CommentType } from './comment-type';
import { CommentModel } from '../../models/comment';

export const ThreadType = builder.objectType(ThreadItem, {
  name: 'Thread',
  description: 'a thread',
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => encodeGlobalID('Thread', parent.id),
    }),
    name: t.exposeString('name', { nullable: true }),
    comments: t.field({
      type: [CommentType],
      resolve: async (parent) =>
        await CommentModel.scan('threadId').eq(parent.id).exec(),
    }),
  }),
});
