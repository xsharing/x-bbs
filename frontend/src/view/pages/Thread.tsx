import { Card } from 'antd';
import { Route, Routes, useParams } from 'react-router-dom';
import { ShowUpdateThreadModalButton } from '../molecules/ShowUpdateThreadModalButton';
import { CommentForm } from '../organisms/CommentForm';
import { Comments } from '../organisms/Comments';
import { ThreadName } from '../organisms/ThreadName';
import { ThreadUpdateForm } from '../organisms/ThreadUpdateForm';

export const Thread = (): JSX.Element => {
  const threadId = useParams<{ threadId: string }>().threadId ?? '';
  return (
    <main>
      <Card
        title={<ThreadName threadId={threadId} />}
        extra={<ShowUpdateThreadModalButton threadId={threadId} />}
      >
        <Comments threadId={threadId} />
        <Card title="comment on this thread">
          <CommentForm threadId={threadId} />
        </Card>
      </Card>
      <Routes>
        <Route
          path="update"
          element={<ThreadUpdateForm threadId={threadId} />}
        />
      </Routes>
    </main>
  );
};
