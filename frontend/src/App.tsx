import React, { useState } from 'react';
import './App.css';
import { atom, useRecoilValue } from 'recoil';
import { RecoilRelayEnvironmentProvider } from 'recoil-relay';
import { myEnvironmentKey, useMyRelayEnvironment } from './exampleQuery';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './view/organisms/AuthGurad';
import AuthorizedLayout from './view/templates/AuthorizedLayout';
import { App as AntdApp } from 'antd';
import Threads from './view/pages/Threads';

function App2(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<AuthorizedLayout />}>
          <Route path="/" element={<Navigate to={'/threads'} />} />
          <Route path="threads/*" element={<Threads />} />
        </Route>
      </Route>
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
