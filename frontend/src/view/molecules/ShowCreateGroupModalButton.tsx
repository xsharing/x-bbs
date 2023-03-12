import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ShowCreateGroupModalButton = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate('/groups/create');
      }}
    >
      create group
    </Button>
  );
};
