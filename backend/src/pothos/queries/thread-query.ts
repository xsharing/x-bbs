import { type ResolveCursorConnectionArgs, resolveCursorConnection } from "@pothos/plugin-relay";
import { builder } from "../builder";
import { ThreadType } from "../types/thread-type";
import { ThreadModel, ThreadObject } from "../../models";
import './query'

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

            const result = (await qb.exec()).map(r => (new ThreadObject(r)));
            return result;
        }),
      })
  }));
  
  