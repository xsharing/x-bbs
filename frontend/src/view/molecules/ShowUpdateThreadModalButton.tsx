import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ShowUpdateThreadModalButton = ({
  threadId,
}: {
  threadId: string;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(`/thread/${threadId}/update`);
      }}
    >
      update thread
    </Button>
  );
};
