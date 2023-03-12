import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

type GroupVisibility = 'public' | 'private' | 'secret';

export class GroupObject {
    id!: string;
    name!: string;

    visibility!: GroupVisibility;

    constructor(item?: GroupItem) {
        if (item != null) {
            this.id = item.id;
            this.name = item.name;
            this.visibility = item.visibility;
        }
    }
}

export class GroupItem extends Item {
    id!: string;
    name!: string;
    visibility!: GroupVisibility;
}

export const GroupModel = dynamoose.model<GroupItem>('Group', {
    id: String,
    name: String,
    visibility: {
        type: String,
        enum: ['public', 'private', 'secret']
    },
});

export const GroupTable = new dynamoose.Table('Group', [GroupModel], {
    throughput: 'ON_DEMAND',
    create: false,
    waitForActive: false,
});

