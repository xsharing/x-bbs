import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';


export class CommentObject  {
  id!: string;
  threadId!: string;
  body!: string;
  authorId!: string;

  constructor(item?: CommentItem) {
    if (item!=null) {
      this.id = item.id;
      this.threadId = item.threadId;
      this.body = item.body;
      this.authorId = item.authorId;
    }
  }
}

export class CommentItem extends Item {
  id!: string;
  threadId!: string;
  body!: string;
  authorId!: string;
}

export const CommentModel = dynamoose.model<CommentItem>('Comment', {
  id: String,
  threadId: String,
  body: String,
  authorId: String,
});

export const CommentTable = new dynamoose.Table('Comment', [CommentModel], {
  throughput: 'ON_DEMAND',
  create: false,
  waitForActive: false,
});
