import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class CommentItem extends Item {
  id!: string;
  threadId!: string;
  body!: string;
}

export const CommentModel = dynamoose.model<CommentItem>('Comment', {
  id: String,
  threadId: String,
  body: String,
});

export const CommentTable = new dynamoose.Table('Comment', [CommentModel], {
  throughput: 'ON_DEMAND',
  create: false,
  waitForActive: false,
});
