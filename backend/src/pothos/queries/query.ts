import { builder } from '../builder';

builder.queryType({
  fields: (t) => ({
    // threads: t.field({
    //   type: [ThreadType],
    //   resolve: async () => await ThreadModel.scan().exec(),
    // }),
  }),
});
