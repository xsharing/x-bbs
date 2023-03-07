import { ThreadModel } from '../models';
import { builder } from './builder';
import { ThreadType } from './types/thread-type';

builder.queryType({
  fields: (t) => ({
    threads: t.field({
      type: [ThreadType],
      resolve: async () => await ThreadModel.scan().exec(),
    }),
  }),
});
