import { Skeleton, Table, type TableProps } from "antd"
import { selector, useRecoilValueLoadable } from "recoil"
import { Thread } from "../../gql/graphql"
import { threadsQuery, } from "../../selector/threads"
import { type threadsQuery$data } from "../../selector/__generated__/threadsQuery.graphql"

type RecordType = Pick<Thread, 'id' | 'name'>

const tablePropsSelector = selector({
    key: 'tablePropsSelector',
    get({ get }) {
        const props: TableProps<RecordType> = {
            rowKey: 'id',
            dataSource: get(threadsQuery).map((node) => {
                return {
                    id: node.id,
                    name: node?.name,
                }
            }) ?? [],
            columns: [
                // { key: 'id', title: 'id', dataIndex: 'id' },
                { key: 'name', title: 'name', render(value, record, index) {
                    console.log(value, record, index)
                    return <a href={`/thread/${record.id}`}>{record.name}</a>
                }, }
            ]
        }

        return props
    },
})


export const ThreadTable = (): JSX.Element => {
    const tableProps = useRecoilValueLoadable(tablePropsSelector);

    if (tableProps.state === 'loading') {
        return <Skeleton />
    }

    console.log(tableProps);

    return <Table {...tableProps.contents} />
}