import { CommentModel, CommentObject } from '../../models/comment';
import { builder } from '../builder';
import { ThreadType } from '../types/thread-type';
import { v4 as uuidv4 } from 'uuid';
import { CommentEdge } from '../types/comment-type';

builder.relayMutationField(
  'addComment',
  {
    inputFields: (t) => ({
      threadId: t.globalID({ required: true, for: ThreadType }),
      body: t.string({ required: true }),
    }),
  },
  {
    authScopes: { authenticated: true },
    resolve: async (root, args, ctx) => {
      const created = await CommentModel.create({
        id: uuidv4(),
        body: args.input.body,
        threadId: args.input.threadId.id,
        authorId: '49cf5c68-bd3e-11ed-8c56-0242ac120003',
      });
      return { success: created != null, created };
    },
  },
  {
    outputFields: (t) => ({
      success: t.boolean({
        resolve: (result) => result.success,
      }),
      commentEdge: t.field({
        type: CommentEdge,
        resolve: (result) => {
          return {
            cursor: result.created.id,
            node: new CommentObject(result.created),
          };
        },
      }),
    }),
  },
);
