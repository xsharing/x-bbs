import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import DataloaderPlugin from '@pothos/plugin-dataloader';
import { type Jwt, type JwtPayload } from 'jsonwebtoken';

SchemaBuilder.allowPluginReRegistration = true;

export const builder = new SchemaBuilder<{
  Scalars: {
    AuthJwtToken: {
      Output: { email: string } & JwtPayload;
      Input: { email: string } & JwtPayload;
    };
  };
  Context: {
    authenticate: (
      strategy: string,
      options: { email: string; password: string },
    ) => Promise<{ user: { email: string } & JwtPayload }>;
  };
}>({
  plugins: [RelayPlugin, DataloaderPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'ID',
  },
});
