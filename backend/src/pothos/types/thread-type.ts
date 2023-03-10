import { decodeGlobalID, encodeGlobalID } from '@pothos/plugin-relay';
import { ThreadModel, ThreadObject } from '../../models';
import { builder } from '../builder';
import { CommentType } from './comment-type';
import { CommentModel, CommentObject } from '../../models/comment';
import { AccountType } from './account-types';

export const ThreadType = builder.loadableNode(ThreadObject, {
  name: 'Thread',
  description: 'a thread',
  id: {
    resolve: (parent) => encodeGlobalID('Thread', parent.id),
    parse: (value) => decodeGlobalID(value).id,
  },
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    comments: t.loadableList({
      type: CommentType,
      load: async (keys: string[], context) => {
        const results = await Promise.all(
          keys.map(
            async (key) =>
              (await CommentModel.query('threadId').eq(key).exec()) ?? [],
          ),
        );
        return results.map((r) => r.map((c) => new CommentObject(c)));
      },
      resolve: (parent) => parent.id,
    }),
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
    console.log('load', ids);
    return (await ThreadModel.batchGet(ids)).map((r) => new ThreadObject(r));
  },
  loaderOptions: {
    maxBatchSize: 100,
  },
  sort: (obj) => obj.id,
});

export const ThreadEdge = builder.edgeObject({
  name: 'ThreadEdge',
  type: ThreadType,
});
