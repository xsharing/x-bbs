import {
  type ResolveCursorConnectionArgs,
  resolveCursorConnection,
  resolveArrayConnection,
} from '@pothos/plugin-relay';
import { builder } from '../builder';
import './query';
import { GroupModel, GroupObject } from '../../models/group';
import { GroupType } from '../types/group-type';

builder.queryFields((t) => ({
  groups: t.connection({
    authScopes: { authenticated: true },
    type: GroupType,
    nullable: false,
    edgesNullable: false,
    resolve: async (_, args) =>
      resolveArrayConnection<GroupObject>(
        {
          args,
        },
        await (async () => {
          const allGroups = await GroupModel.scan().all().exec();
          // TODO: filter, sort, etc.
          return allGroups.map((group) => new GroupObject(group));
        })(),
      ),
  }),
}));
