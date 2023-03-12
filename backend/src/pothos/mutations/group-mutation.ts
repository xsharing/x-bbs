import { CommentModel, CommentObject } from '../../models/comment';
import { builder } from '../builder';
import { ThreadType } from '../types/thread-type';
import { v4 as uuidv4 } from 'uuid';
import { CommentEdge } from '../types/comment-type';
import { GroupEdge, GroupType, GroupVisibilityEnum } from '../types/group-type';
import { GroupModel, GroupObject } from '../../models/group';
import dynamoose from 'dynamoose'
import { GroupMembershipModel, GroupMembershipObject } from '../../models/group-membership';
import { TransactionReturnOptions } from 'dynamoose/dist/Transaction';
import { GroupMembershipEdge } from '../types/group-membership-type';

builder.relayMutationField(
    'createGroup',
    {
        inputFields: (t) => ({
            name: t.string({ required: true }),
            visibility: t.field({ type: GroupVisibilityEnum, required: true })
        }),
    },
    {
        authScopes: { authenticated: true },
        resolve: async (root, args, ctx) => {
            const groupId = uuidv4();
            const membershipId = uuidv4();

            try {
                await dynamoose.transaction([
                    GroupModel.transaction.create({
                        id: groupId,
                        name: args.input.name,
                        visibility: args.input.visibility,
                    }),
                    GroupMembershipModel.transaction.create({
                        id: membershipId,
                        groupId,
                        accountId: 'todo', // TODO: get accountId from context
                    }),
                ]);
                const group = await GroupModel.get(groupId, { consistent: true });
                const membership = await GroupMembershipModel.get(membershipId, { consistent: true });
                return { success: true, created: { group, membership } };
            } catch (e) {
                return { success: false, created: null };
            }
        },
    },
    {
        outputFields: (t) => ({
            success: t.boolean({
                resolve: (result) => result.success,
            }),
            groupEdge: t.field({
                type: GroupEdge,
                nullable: true,
                resolve: (result) => {
                    if ((result.created?.group) != null) {
                        return {
                            cursor: result.created?.group.id,
                            node: new GroupObject(result.created?.group),
                        };
                    } else {
                        return null;
                    }
                },
            }),
            membershipEdge: t.field({
                type: GroupMembershipEdge,
                nullable: true,
                resolve: (result) => {
                    if ((result.created?.membership) != null) {
                        return {
                            cursor: result.created?.membership.id,
                            node: new GroupMembershipObject(result.created?.membership),
                        };
                    } else {
                        return null;
                    }
                },
            }),
        }),
    },
);


builder.relayMutationField(
    'updateGroup',
    {
        inputFields: (t) => ({
            id: t.globalID({ required: true, for: GroupType }),
            name: t.string({ required: true }),
            visibility: t.field({ type: GroupVisibilityEnum, required: true })
        }),
    },
    {
        authScopes: { authenticated: true },
        resolve: async (root, args, ctx) => {
            const updated = await GroupModel.update(args.input.id, {
                name: args.input.name,
                visibility: args.input.visibility,
            })
            return { success: updated != null, updated };
        },
    },
    {
        outputFields: (t) => ({
            success: t.boolean({
                resolve: (result) => result.success,
            }),
            groupEdge: t.field({
                type: GroupEdge,
                resolve: (result) => {
                    return {
                        cursor: result.updated.id,
                        node: new GroupObject(result.updated),
                    };
                },
            }),
        }),
    },
);
