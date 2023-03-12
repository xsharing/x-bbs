import { encodeGlobalID } from '@pothos/plugin-relay';
import { GroupMembershipModel, GroupMembershipObject } from '../../models/group-membership';
import { builder } from '../builder'; import { AccountType } from './account-types';
import { ThreadType } from './thread-type';


export const GroupMembershipType = builder.loadableNode(GroupMembershipObject, {
    authScopes: { authenticated: true },
    name: 'GroupMembership',
    description: 'a GroupMembership',
    id: {
        resolve: (parent) => encodeGlobalID('GroupMembership', parent.id),
    },
    fields: (t) => ({
        account: t.field({ type: AccountType, resolve: async (parent, context) => await AccountType.getDataloader(context).load(parent.accountId) }),
        thread: t.field({ type: ThreadType, resolve: async (parent, context) => await ThreadType.getDataloader(context).load(parent.accountId) })
    }),
    async load(ids) {
        console.log('load GroupMemberships', ids);
        return await GroupMembershipModel.batchGet(ids);
    },
    loaderOptions: {
        maxBatchSize: 100,
    },
    sort: (obj) => obj.id,
});

export const GroupMembershipEdge = builder.edgeObject({
    name: 'GroupMembershipEdge',
    type: GroupMembershipType,
});
