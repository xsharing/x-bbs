import dotenv from 'dotenv';
import { encodeGlobalID } from '@pothos/plugin-relay';
import { ThreadModel } from '../models';

dotenv.config();

const seeder = async (): Promise<void> => {
  await ThreadModel.create(
    {
      id: encodeGlobalID('Thread', 'd8c5fc08-bce7-11ed-80a4-0242ac120003'),
      name: 'Dev Thread d8',
    },
    { overwrite: true },
  );

  console.log(
    (await ThreadModel.scan().filter('name').beginsWith('Dev').exec()).toJSON(),
  );
};

seeder().catch(console.error);
