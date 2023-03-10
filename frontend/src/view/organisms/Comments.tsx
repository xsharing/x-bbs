import { useRecoilValue } from 'recoil';
import { threadQuery } from '../../selector/thread';
import { Comment } from '@ant-design/compatible';

export const Comments = ({ threadId }: { threadId: string }): JSX.Element => {
  const comments = useRecoilValue(threadQuery(threadId)).node?.comments?.edges;
  return (
    <div>
      {comments?.map((c) => (
        <Comment key={c?.node.id} content={c?.node.body} />
      ))}
    </div>
  );
};
