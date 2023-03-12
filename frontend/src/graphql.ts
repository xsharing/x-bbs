import { useMemo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { atom, selector, type GetRecoilValue } from 'recoil';
import { EnvironmentKey } from 'recoil-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const authorizationTokenAtom = atom<string | null>({
  key: 'authorizationTokenAtom',
  default: null,
});

export const useAuthorizationTokenGetter = (): (() => string | null) => {
  const getter = useRecoilCallback(({ snapshot }) => () => {
    const release = snapshot.retain();
    const value = snapshot.getLoadable(authorizationTokenAtom).getValue();
    release();
    return value;
  });
  return getter;
};

export const useAuthorizationTokenSetter = (): ((
  token: string | null,
) => void) => {
  const setter = useRecoilCallback(({ set }) => (token: string | null) => {
    set(authorizationTokenAtom, token);
  });
  return setter;
};

export const loggedInSelector = selector({
  key: 'loggedInSelector',
  get: ({ get }) => {
    return get(authorizationTokenAtom) != null;
  },
});

const fetchQueryConstructor = (
  authorizationTokenGetter: () => string | null,
) => {
  return async function fetchQuery(
    operation: any,
    variables: any,
    _cacheConfig: any,
    _uploadables: any,
  ): Promise<any> {
    console.log('operation', operation, variables);
    const authorizationToken = authorizationTokenGetter();
    return await fetch('http://localhost:4002/graphql', {
      method: 'POST',
      headers: {
        ...(authorizationToken != null
          ? { authorization: `Bearer ${authorizationToken}` }
          : {}),
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text, // GraphQL text from input
        variables,
      }),
    }).then(async (response) => {
      return await response.json();
    });
  };
};

export const useMyRelayEnvironment = (): Environment => {
  const authorizationTokenGetter = useAuthorizationTokenGetter();

  return useMemo(() => {
    const fetchQuery = fetchQueryConstructor(authorizationTokenGetter);
    const source = new RecordSource();
    const store = new Store(source);
    const network = Network.create(fetchQuery);
    const handlerProvider = null;
    return new Environment({
      handlerProvider, // Can omit.
      network,
      store,
    });
  }, [authorizationTokenGetter]);
};

export const myEnvironmentKey = new EnvironmentKey('My Environment');
