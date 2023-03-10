import { useRecoilValue } from 'recoil';
import { threadQuery } from '../../selector/thread';

export const ThreadName = ({ threadId }: { threadId: string }): JSX.Element => {
  const data = useRecoilValue(threadQuery(threadId));
  return <>{data.node?.name}</>;
};
