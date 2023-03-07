import dotenv from 'dotenv';
import { encodeGlobalID } from '@pothos/plugin-relay';
import { ThreadModel } from '../models';
import { CommentModel } from '../models/comment';

dotenv.config();

const seeder = async (): Promise<void> => {
  await ThreadModel.create(
    {
      id: 'd8c5fc08-bce7-11ed-80a4-0242ac120003',
      name: 'Dev Thread d8',
    },
    { overwrite: true },
  );
  await CommentModel.create(
    {
      id: '48347f1a-bced-11ed-884f-0242ac120003',
      threadId: 'd8c5fc08-bce7-11ed-80a4-0242ac120003',
      body: 'Dev comment 48',
    },
    { overwrite: true },
  );
  await CommentModel.create(
    {
      id: '4bc64eec-bced-11ed-8d8f-0242ac120003',
      threadId: 'd8c5fc08-bce7-11ed-80a4-0242ac120003',
      body: 'Dev comment 4b',
    },
    { overwrite: true },
  );

  console.log(
    (await ThreadModel.scan().filter('name').beginsWith('Dev').exec()).toJSON(),
  );
  console.log(
    (
      await CommentModel.scan().filter('body').beginsWith('Dev').exec()
    ).toJSON(),
  );
};

seeder().catch(console.error);
