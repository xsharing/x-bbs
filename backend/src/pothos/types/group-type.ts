import { encodeGlobalID, resolveArrayConnection } from '@pothos/plugin-relay';
import { GroupModel, GroupObject } from '../../models/group';
import { builder } from '../builder';
import { AccountType } from './account-types';
import { GroupMembershipEdge, GroupMembershipType } from './group-membership-type';
import { GroupMembershipModel, GroupMembershipObject } from '../../models/group-membership';
import { GroupInvitationType } from './group-invitation-type';
import { GroupInvitationModel, GroupInvitationObject } from '../../models/group-invitation';

export const GroupVisibilityEnum = builder.enumType('GroupVisibilityEnum', {
    values: ['public', 'private', 'secret'] as const,
});

export const GroupType = builder.loadableNode(GroupObject, {
    authScopes: { authenticated: true },
    name: 'Group',
    description: 'a Group',
    id: {
        resolve: (parent) => encodeGlobalID('Group', parent.id),
    },
    fields: (t) => ({
        name: t.string({ resolve: (parent) => parent.name }),

        visibility: t.field({
            type: GroupVisibilityEnum,
            resolve: (parent) => parent.visibility,
        }),

        memberships: t.connection({
            type: GroupMembershipType,
            resolve: async (parent, args) =>
                resolveArrayConnection(
                    { args },
                    (
                        (await GroupMembershipModel.query('threadId').eq(parent.id).exec()) ?? []
                    ).map((r) => new GroupMembershipObject(r)),
                ),
        }),

        invitations: t.connection({
            type: GroupInvitationType,
            resolve: async (parent, args) =>
                resolveArrayConnection(
                    { args },
                    (
                        (await GroupInvitationModel.query('threadId').eq(parent.id).exec()) ?? []
                    ).map((r) => new GroupInvitationObject(r)),
                ),
        }),
    }),
    async load(ids) {
        console.log('load Groups', ids);
        return await GroupModel.batchGet(ids);
    },
    loaderOptions: {
        maxBatchSize: 100,
    },
    sort: (obj) => obj.id,
});

export const GroupEdge = builder.edgeObject({
    name: 'GroupEdge',
    type: GroupType,
});
