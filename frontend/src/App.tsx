import React, { useState } from 'react';
import './App.css';
import { atom, useRecoilValue } from 'recoil';
import { RecoilRelayEnvironmentProvider } from 'recoil-relay';
import { exampleQuery, myEnvironmentKey, useMyRelayEnvironment } from './exampleQuery';

const myAtom = atom({
  key: 'myAtom',
  default: 'hello'
})

function App2(): JSX.Element {
  const [count, setCount] = useState(0);
  const val = useRecoilValue(myAtom);
  const gqlVal = useRecoilValue(exampleQuery);

  return (
    <div className="App">
      <h1>Vite + React + Recoil {val} {JSON.stringify(gqlVal)}</h1>
      <div className="card">
        <button onClick={() => { setCount((count) => count + 1); }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

function App(): JSX.Element {
  const myEnvironment = useMyRelayEnvironment();
  return <RecoilRelayEnvironmentProvider
  environment={myEnvironment}
  environmentKey={myEnvironmentKey}>
    <React.Suspense fallback={'.......'}>
      <App2/>
    </React.Suspense>
  </RecoilRelayEnvironmentProvider>
}

export default App;
