import { type ResolveCursorConnectionArgs, resolveCursorConnection } from '@pothos/plugin-relay';
import { ThreadModel, ThreadObject } from '../models';
import { builder } from './builder';
import { ThreadType } from './types/thread-type';


builder.queryType({
  fields: (t) => ({
    // threads: t.field({
    //   type: [ThreadType],
    //   resolve: async () => await ThreadModel.scan().exec(),
    // }),
  }),
});

builder.queryFields((t) => ({
  threads: t.connection(
    {
      type: ThreadType,
      resolve: async(_, args) => await resolveCursorConnection({
        args,
        toCursor: (thread) => thread.id,
      }, 
        async ({ before, after, limit, inverted }: ResolveCursorConnectionArgs) => {
          console.log('before', before, 'after', after, 'limit', limit, 'inverted', inverted);

          let qb = ThreadModel.scan();
          if (before != null) {
            qb = qb.filter('id').lt(before);
          }
          if (after != null) {
            qb = qb.startAt({id: after})
          }
          qb.limit(limit);

          if (inverted) {
            // TODO: figure out how to invert the sort order
          }

          const result =[... await qb.exec()];

          console.log('result', result);

          const result2 = result.map(r => (new ThreadObject(r)))
          
          console.log('result2', result2);

          return result2;
      }),
    })
}));

