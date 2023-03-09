import { useMemo } from 'react';
import { GetRecoilValue } from 'recoil';
import { EnvironmentKey, graphQLSelector } from 'recoil-relay';
import {
  Environment,
  graphql,
  Network,
  RecordSource,
  Store,
  Variables,
} from 'relay-runtime';

async function fetchQuery(
  operation: any,
  variables: any,
  _cacheConfig: any,
  _uploadables: any,
): Promise<any> {
  console.log('operation', operation, variables);
  return await fetch('http://localhost:4002/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(async (response) => {
    return await response.json();
  });
}

export const useMyRelayEnvironment = (): Environment => {
  return useMemo(() => {
    const source = new RecordSource();
    const store = new Store(source);
    const network = Network.create(fetchQuery);
    const handlerProvider = null;
    return new Environment({
      handlerProvider, // Can omit.
      network,
      store,
    });
  }, []);
};
export const myEnvironmentKey = new EnvironmentKey('My Environment');

export const exampleQuery = graphQLSelector({
  key: 'exampleQuery',
  environment: myEnvironmentKey,
  query: graphql`
    query exampleQuery {
      threads {
        edges {
          node {
            name
          }
        }
      }
    }
  `,
  variables: {},
  mapResponse: function (
    response: any,
    callbacks: { get: GetRecoilValue; variables: Variables },
  ): unknown {
    return response;
  },
});
