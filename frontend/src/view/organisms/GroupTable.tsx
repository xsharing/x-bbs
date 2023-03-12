import { Skeleton, Table, type TableProps } from 'antd';
import { selector, useRecoilValueLoadable } from 'recoil';
import { type Group } from '../../gql/graphql';
import { groupsQuery } from '../../selector/groups';

type RecordType = Pick<Group, 'id' | 'name'>;

const tablePropsSelector = selector({
  key: 'groupsTablePropsSelector',
  get({ get }) {
    const props: TableProps<RecordType> = {
      rowKey: 'id',
      dataSource:
        get(groupsQuery).nodes.map((node) => {
          return {
            id: node.id,
            name: node?.name,
          };
        }) ?? [],
      columns: [
        // { key: 'id', title: 'id', dataIndex: 'id' },
        {
          key: 'name',
          title: 'name',
          render(value, record, index) {
            console.log(value, record, index);
            return <a href={`/group/${record.id}`}>{record.name}</a>;
          },
        },
      ],
    };

    return props;
  },
});

export const GroupTable = (): JSX.Element => {
  const tableProps = useRecoilValueLoadable(tablePropsSelector);

  if (tableProps.state === 'loading') {
    return <Skeleton />;
  }

  console.log(tableProps);

  return <Table {...tableProps.contents} />;
};
