import { selector, type GetRecoilValue } from 'recoil';
import { graphQLSelector } from 'recoil-relay';
import { Environment, useMutation, type UseMutationConfig } from 'react-relay';
import {
  type Disposable,
  graphql,
  type MutationParameters,
  type Variables,
  commitMutation,
  ConnectionHandler,
} from 'relay-runtime';
import { myEnvironmentKey } from '../exampleQuery';
import { type threadsQuery$data } from './__generated__/threadsQuery.graphql';

export const threadsQuery = graphQLSelector({
  key: 'threadsQuery',
  environment: myEnvironmentKey,
  query: graphql`
    query threadsQuery($first: Int, $last: Int) {
      threads(first: $first, last: $last)
        @connection(key: "connection__threads") {
        __id
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
  variables: {},
  mapResponse: function (
    response: threadsQuery$data,
    callbacks: { get: GetRecoilValue; variables: Variables },
  ) {
    return {
      nodes: response.threads.edges.map((edge) => edge.node),
      edgesConnectionId: response.threads.__id,
    };
  },
});

export const useCreateThreadCommitEvent = (): readonly [
  (config: UseMutationConfig<MutationParameters>) => Disposable,
  boolean,
] => {
  const [commit, isInFlight] = useMutation(
    graphql`
      mutation threadsCreateThreadMutation(
        $connections: [ID!]!
        $input: CreateThreadInput!
      ) {
        createThread(input: $input) {
          success
          threadEdge {
            cursor

            node
              @appendNode(
                connections: $connections
                edgeTypeName: "ThreadEdge"
              ) {
              id
              name
            }
          }
        }
      }
    `,
    // (environment: Environment, config) => {
    //   console.log('commitMutationFn', environment, config);
    //   return commitMutation(environment, config);
    // },
  );
  return [commit, isInFlight] as const;
};
