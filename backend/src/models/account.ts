import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';


export class AccountObject  {
  id!: string;
  name!: string;
  constructor(item?: AccountItem) {
    if (item!=null) {
        this.id = item.id;
        this.name = item.name;
    }
  }
}

export class AccountItem extends Item {
  id!: string;
  name!: string;
}

export const AccountModel = dynamoose.model<AccountItem>('Account', {
  id: String,
  name: String,
});

export const AccountTable = new dynamoose.Table('Account', [AccountModel], {
  throughput: 'ON_DEMAND',
  create: false,
  waitForActive: false,
});
