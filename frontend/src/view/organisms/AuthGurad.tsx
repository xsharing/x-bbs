import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { loggedInSelector } from '../../graphql';

export const AuthGuard = (): JSX.Element => {
  const loggedIn = useRecoilValueLoadable(loggedInSelector);

  if (loggedIn.state === 'loading') {
    return <div>Loading...</div>;
  } else if (loggedIn.state === 'hasError' || !loggedIn.contents) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
