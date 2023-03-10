import { encodeGlobalID } from '@pothos/plugin-relay';
import { AccountObject } from '../../models/account';
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
    author: t.loadable({
      type: AccountType,
      load: async (keys: string[], context) => {
        return await AccountType.getDataloader(context).loadMany(keys);
      },
      sort: (obj) => (typeof obj === 'string' ? obj : obj.id),
      resolve: (parent) => parent.authorId,
    }),
  }),
  async load(ids) {
    console.log('load comments', ids);
    return await CommentModel.batchGet(ids);
  },
  loaderOptions: {
    maxBatchSize: 100,
  },
  sort: (obj) => obj.id,
});

export const CommentEdge = builder.edgeObject({
  name: 'CommentEdge',
  type: CommentType,
});
