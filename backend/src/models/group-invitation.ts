import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class GroupInvitationObject {
    id!: string;
    accountId!: string;
    groupId!: string;

    constructor(item?: GroupInvitationItem) {
        if (item != null) {
            this.id = item.id;
            this.accountId = item.accountId;
            this.groupId = item.groupId;
        }
    }
}

export class GroupInvitationItem extends Item {
    id!: string;
    accountId!: string;
    groupId!: string;
}

export const GroupInvitationModel = dynamoose.model<GroupInvitationItem>('GroupInvitation', {
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

export const GroupInvitationTable = new dynamoose.Table('GroupInvitation', [GroupInvitationModel], {
    throughput: 'ON_DEMAND',
    create: false,
    waitForActive: false,
});
