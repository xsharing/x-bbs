import { encodeGlobalID } from '@pothos/plugin-relay';
import { ThreadItem, ThreadModel, ThreadObject } from '../../models';
import { builder } from '../builder';
import { CommentType } from './comment-type';
import { CommentModel } from '../../models/comment';

export const ThreadType = builder.node(ThreadObject, {
  name: 'Thread',
  description: 'a thread',
  id: {
    resolve: (parent) => encodeGlobalID('Thread', parent.id),
  },
  fields: (t) => ({
    // id: t.globalID({
    //   resolve: (parent) => encodeGlobalID('Thread', parent.id),
    // }),
    name: t.exposeString('name', { nullable: true }),
    // comments: t.field({
    //   type: [CommentType],
    //   resolve: async (parent) =>
    //     await CommentModel.scan('threadId').eq(parent.id).exec(),
    // }),
  }),
  async loadOne(id) {
    console.log('loadOne', id);
    return await ThreadModel.get(id);
  }
});
