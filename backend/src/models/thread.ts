import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

// TODO: Thread Object and ThreadItem are the same.  I don't know why I need both.
export class ThreadObject {
  id!: string;
  name!: string;
  constructor(item?: ThreadItem) {
    if (item!=null) {
      this.id = item.id;
      this.name = item.name;
    }
  }
}

export class ThreadItem extends Item {
  id!: string;
  name!: string;
}

export const ThreadModel = dynamoose.model<ThreadItem>('Thread', {
  id: String,
  name: String,
});

export const ThreadTable = new dynamoose.Table('Thread', [ThreadModel], {
  throughput: 'ON_DEMAND',
  create: false,
  waitForActive: false,
});
