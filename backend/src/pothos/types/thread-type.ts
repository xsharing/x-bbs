import { ResolveCursorConnectionArgs, encodeGlobalID, resolveCursorConnection } from '@pothos/plugin-relay';
import { ThreadItem, ThreadModel, ThreadObject } from '../../models';
import { builder } from '../builder';
import { CommentType } from './comment-type';
import { CommentModel, CommentObject } from '../../models/comment';
import { AccountType } from './account-types';

export const ThreadType = builder.loadableNode(ThreadObject, {
  name: 'Thread',
  description: 'a thread',
  id: {
    resolve: (parent) => encodeGlobalID('Thread', parent.id),
  },
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    comments: t.field({
      type: [CommentType],
      resolve: async (parent) =>
        (await CommentModel.scan('threadId').eq(parent.id).exec()).map(r => new CommentObject(r)),
    }),
    author: t.field({
      type: AccountType,
      resolve: async (parent, _, context) => {
        return await AccountType.getDataloader(context).load(parent.authorId)
      }
    })
  }),
  async load(ids) {
    console.log('load', ids);
    return await ThreadModel.batchGet(ids);
  },
  loaderOptions: {
    maxBatchSize: 100,
  },
  sort: obj => obj.id,
});
