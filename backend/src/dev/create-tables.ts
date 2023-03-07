import dotenv from 'dotenv';
import { ThreadTable } from '../models';
import { ResourceInUseException } from '@aws-sdk/client-dynamodb';
import { type Table } from 'dynamoose/dist/Table';
import { CommentTable } from '../models/comment';
// import dynamoose from 'dynamoose';

dotenv.config();

const createTable = async (table: Table): Promise<void> => {
  try {
    // await dynamoose.aws.ddb().deleteTable({TableName: table.name});
    await table.create();
  } catch (e: unknown) {
    if (e instanceof ResourceInUseException) {
      // ignore
    } else {
      throw e;
    }
  }
};

const createTables = async (): Promise<void> => {
  await createTable(ThreadTable);
  await createTable(CommentTable);
};

createTables().catch(console.error);
