import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class GroupMembershipObject {
    id!: string;
    accountId!: string;
    groupId!: string;

    constructor(item?: GroupMembershipItem) {
        if (item != null) {
            this.id = item.id;
            this.accountId = item.accountId;
            this.groupId = item.groupId;
        }
    }
}

export class GroupMembershipItem extends Item {
    id!: string;
    accountId!: string;
    groupId!: string;
}

export const GroupMembershipModel = dynamoose.model<GroupMembershipItem>('GroupMembership', {
    id: String,
    accountId: {
        type: String,
        index: true
    },
    groupId: {
        type: String,
        index: true
    },
});

export const GroupMembershipTable = new dynamoose.Table('GroupMembership', [GroupMembershipModel], {
    throughput: 'ON_DEMAND',
    create: false,
    waitForActive: false,
});
