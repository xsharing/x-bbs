import dotenv from 'dotenv';
import { ThreadModel } from '../models';
import { CommentModel } from '../models/comment';
import { AccountModel } from '../models/account';

dotenv.config();

const seeder = async (): Promise<void> => {
  await AccountModel.create({
    id: '355ca11e-bd3e-11ed-92d9-0242ac120003',
    name: 'Dev Doe',
  }, {overwrite: true});
  await AccountModel.create({
    id: '49cf5c68-bd3e-11ed-8c56-0242ac120003',
    name: 'Dev Doe',
  }, {overwrite: true});

  await ThreadModel.create(
    {
      id: 'd8c5fc08-bce7-11ed-80a4-0242ac120003',
      name: 'Dev Thread d8',
      authorId: '49cf5c68-bd3e-11ed-8c56-0242ac120003',
    },
    { overwrite: true },
  );
  await CommentModel.create(
    {
      id: '48347f1a-bced-11ed-884f-0242ac120003',
      threadId: 'd8c5fc08-bce7-11ed-80a4-0242ac120003',
      body: 'Dev comment 48',
      authorId: '49cf5c68-bd3e-11ed-8c56-0242ac120003',
    },
    { overwrite: true },
  );
  await CommentModel.create(
    {
      id: '4bc64eec-bced-11ed-8d8f-0242ac120003',
      threadId: 'd8c5fc08-bce7-11ed-80a4-0242ac120003',
      body: 'Dev comment 4b',
      authorId: '355ca11e-bd3e-11ed-92d9-0242ac120003',
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
