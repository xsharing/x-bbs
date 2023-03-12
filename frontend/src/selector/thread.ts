import { useMutation, type UseMutationConfig } from 'react-relay';
import { type GetRecoilValue } from 'recoil';
import { graphQLSelector, graphQLSelectorFamily } from 'recoil-relay';
import {
  type Disposable,
  graphql,
  type MutationParameters,
  type Variables,
} from 'relay-runtime';
import { myEnvironmentKey } from '../graphql';
import { type threadQuery$data } from './__generated__/threadQuery.graphql';

export const threadQuery = graphQLSelectorFamily({
  key: 'threadQuery',
  environment: myEnvironmentKey,
  query: graphql`
    query threadQuery($id: ID!) {
      node(id: $id) {
        id
        ... on Thread {
          name
          comments(first: 0) @connection(key: "connection__comments") {
            __id
            edges {
              node {
                id
                body
              }
            }
          }
          author {
            name
          }
        }
      }
    }
  `,
  variables(parameter: string) {
    return { id: parameter };
  },
  mapResponse: function (
    response: threadQuery$data,
    callbacks: { get: GetRecoilValue; variables: Variables },
  ) {
    return {
      node: response.node,
      commentsConnectionId: response.node?.comments?.__id,
    };
  },
});

export const useUpdateThreadCommitEvent = (): readonly [
  (config: UseMutationConfig<MutationParameters>) => Disposable,
  boolean,
] => {
  const [commit, isInFlight] = useMutation(
    graphql`
      mutation threadUpdateThreadMutation($input: UpdateThreadInput!) {
        updateThread(input: $input) {
          success
          threadEdge {
            cursor

            node {
              id
              name
            }
          }
        }
      }
    `,
  );
  return [commit, isInFlight] as const;
};
