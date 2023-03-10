import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ShowCreateThreadModalButton = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate('/threads/create');
      }}
    >
      create thread
    </Button>
  );
};
