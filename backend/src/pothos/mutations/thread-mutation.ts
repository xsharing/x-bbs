import { ThreadItem, ThreadModel, ThreadObject } from '../../models';
import { builder } from '../builder';
import { v4 as uuidv4 } from 'uuid';
import { ThreadEdge } from '../types/thread-type';

builder.relayMutationField(
  'createThread',
  {
    inputFields: (t) => ({
      name: t.string({ required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const created = await ThreadModel.create({
        id: uuidv4(),
        name: args.input.name,
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
      threadEdge: t.field({
        type: ThreadEdge,
        resolve: (result) => {
          return {
            cursor: result.created.id,
            node: new ThreadObject(result.created),
          };
        },
      }),
    }),
  },
);
