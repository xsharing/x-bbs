import React from 'react';
import './App.css';
import { RecoilRelayEnvironmentProvider } from 'recoil-relay';
import { myEnvironmentKey, useMyRelayEnvironment } from './graphql';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './view/organisms/AuthGurad';
import AuthorizedLayout from './view/templates/AuthorizedLayout';
import { App as AntdApp } from 'antd';
import Threads from './view/pages/Threads';
import { Thread } from './view/pages/Thread';
import Login from './view/pages/Login';

function App2(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<AuthorizedLayout />}>
          <Route path="/" element={<Navigate to={'/threads'} />} />
          <Route path="threads/*" element={<Threads />} />
          <Route path="thread/:threadId/*" element={<Thread />} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />
    </Routes>
  );
}

function App(): JSX.Element {
  const myEnvironment = useMyRelayEnvironment();
  return (
    <RecoilRelayEnvironmentProvider
      environment={myEnvironment}
      environmentKey={myEnvironmentKey}
    >
      <React.Suspense fallback={'.......'}>
        <BrowserRouter>
          <AntdApp>
            <App2 />
          </AntdApp>
        </BrowserRouter>
      </React.Suspense>
    </RecoilRelayEnvironmentProvider>
  );
}

export default App;
