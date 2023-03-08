import { encodeGlobalID } from '@pothos/plugin-relay';
import { builder } from '../builder';
import { AccountModel, AccountObject } from '../../models/account';

export const AccountType = builder.loadableNode(AccountObject, {
  name: 'Account',
  description: 'an account / user',
  id: {
    resolve: (parent) => encodeGlobalID('Account', parent.id),
  },
  fields: (t) => ({
    name: t.exposeString('name'),
  }),
  async load(ids) {
    console.log('load accounts', ids);
    return (await AccountModel.batchGet(ids)).map((r) => new AccountObject(r));
  },
  loaderOptions: {
    maxBatchSize: 100,
  },
  sort: (obj) => obj.id,
});
