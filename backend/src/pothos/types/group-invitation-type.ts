import { encodeGlobalID } from '@pothos/plugin-relay';
import { GroupInvitationModel, GroupInvitationObject } from '../../models/group-invitation';
import { builder } from '../builder'; import { AccountType } from './account-types';
import { ThreadType } from './thread-type';


export const GroupInvitationType = builder.loadableNode(GroupInvitationObject, {
    authScopes: { authenticated: true },
    name: 'GroupInvitation',
    description: 'a GroupInvitation',
    id: {
        resolve: (parent) => encodeGlobalID('GroupInvitation', parent.id),
    },
    fields: (t) => ({
        account: t.field({ type: AccountType, resolve: async (parent, context) => await AccountType.getDataloader(context).load(parent.accountId) }),
        thread: t.field({ type: ThreadType, resolve: async (parent, context) => await ThreadType.getDataloader(context).load(parent.accountId) })
    }),
    async load(ids) {
        console.log('load GroupInvitations', ids);
        return await GroupInvitationModel.batchGet(ids);
    },
    loaderOptions: {
        maxBatchSize: 100,
    },
    sort: (obj) => obj.id,
});

export const GroupInvitationEdge = builder.edgeObject({
    name: 'GroupInvitationEdge',
    type: GroupInvitationType,
});
