import { Card } from 'antd';
import { Route, Routes, useParams } from 'react-router-dom';
import { ShowUpdateThreadModalButton } from '../molecules/ShowUpdateThreadModalButton';
import { ThreadName } from '../organisms/ThreadName';
import { ThreadUpdateForm } from '../organisms/ThreadUpdateForm';

export const Thread = (): JSX.Element => {
  const threadId = useParams<{ threadId: string }>().threadId ?? '';
  return (
    <main>
      <Card title={<ThreadName threadId={threadId} />} extra={<ShowUpdateThreadModalButton threadId={ threadId } />}></Card>
      <Routes>
        <Route path='update' element={<ThreadUpdateForm threadId={  threadId} />} />
      </Routes>
    </main>
  );
};
