import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

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
  create: true, // TODO: if only dev
  waitForActive: true, // TODO: if only dev
});
