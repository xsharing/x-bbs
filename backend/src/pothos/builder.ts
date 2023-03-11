import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import DataloaderPlugin from '@pothos/plugin-dataloader';
import { type Jwt, type JwtPayload } from 'jsonwebtoken';

SchemaBuilder.allowPluginReRegistration = true;

type BaseType<T extends Record<string, unknown>> = (
  strategy: string,
  options: Record<string, unknown>,
) => Promise<T>;

type GraphQLLocalStrategyType = BaseType<{
  user: { email: string } & JwtPayload;
}> &
  ((
    strategy: 'graphql-local',
    options: { email: string; password: string },
  ) => Promise<{ user: { email: string } & JwtPayload }>);

type JwtStrategyType = BaseType<{ user: { email: string } & JwtPayload }> &
  ((
    strategy: 'jwt',
    options: Record<string, unknown>,
  ) => Promise<{ user: { email: string } & JwtPayload }>);

type AuthenticationTypes = GraphQLLocalStrategyType | JwtStrategyType;

export const builder = new SchemaBuilder<{
  Scalars: {
    AuthJwtToken: {
      Output: { email: string } & JwtPayload;
      Input: { email: string } & JwtPayload;
    };
  };
  Context: {
    authenticate: AuthenticationTypes;
  };
  AuthScopes: {
    anyone: true;
    authenticated: boolean;
  };
}>({
  plugins: [RelayPlugin, ScopeAuthPlugin, DataloaderPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'ID',
  },
  authScopes: async (context) => {
    const verified = await context.authenticate('jwt', {});
    // console.log('authScope', verified);
    return {
      // TODO: implement me!
      anyone: true,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      authenticated: !!verified.user.email,
    };
  },
});
