import { builder } from '../builder';
import { AuthJwtToken } from '../types/auth-types';

const LoginInput = builder.inputType('LoginInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

builder.mutationField('login', (t) =>
  t.field({
    authScopes: { anyone: true },
    type: AuthJwtToken,
    args: {
      input: t.arg({ type: LoginInput, required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const { user } = await ctx.authenticate('graphql-local', {
        email: args.input.email,
        password: args.input.password,
      });
      // console.log('user', user);
      return user;
    },
  }),
);
