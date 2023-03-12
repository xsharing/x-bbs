import dotenv from 'dotenv';
import { ThreadTable } from '../models';
import { ResourceInUseException } from '@aws-sdk/client-dynamodb';
import { type Table } from 'dynamoose/dist/Table';
import { CommentTable } from '../models/comment';
import { AccountTable } from '../models/account';
import dynamoose from 'dynamoose';
import { GroupTable } from '../models/group';
import { GroupMembershipTable } from '../models/group-membership';
import { GroupInvitationTable } from '../models/group-invitation';
import ddb from 'dynamoose/dist/aws/ddb';

dotenv.config();

const createTable = async (table: Table): Promise<void> => {
  try {
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
  await createTable(AccountTable);
  await createTable(GroupTable);
  await createTable(GroupMembershipTable);
  await createTable(GroupInvitationTable);
};

createTables().catch(console.error);
