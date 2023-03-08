import { encodeGlobalID } from '@pothos/plugin-relay';
import { CommentModel, CommentObject } from '../../models/comment';
import { builder } from '../builder';
import { AccountType } from './account-types';

export const CommentType = builder.loadableNode(CommentObject, {
  name: 'Comment',
  description: 'a comment',
  id: {
    resolve: (parent) => encodeGlobalID('Comment', parent.id),
  },
  fields: (t) => ({
    threadId: t.string({
      resolve: (parent) => encodeGlobalID('Thread', parent.threadId),
    }),
    body: t.exposeString('body'),
    author: t.field({
      type: AccountType,
      
      resolve: async (parent, _ ,context) => {
        return await AccountType.getDataloader(context).load(parent.authorId)
      }
    })
  }),
  async load(ids) {
    console.log('loadOne', ids);
    return await CommentModel.batchGet(ids);
  },
  loaderOptions: {
    maxBatchSize: 100,
  },
  sort: obj => obj.id,
});
