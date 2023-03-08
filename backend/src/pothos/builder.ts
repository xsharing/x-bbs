import SchemaBuilder from '@pothos/core';
import RelayPlugin from '@pothos/plugin-relay';
import DataloaderPlugin from '@pothos/plugin-dataloader';

SchemaBuilder.allowPluginReRegistration = true;

export const builder = new SchemaBuilder({
  plugins: [RelayPlugin, DataloaderPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'ID',
  },
  
});

