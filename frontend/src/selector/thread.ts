import { useMutation, UseMutationConfig } from 'react-relay';
import { GetRecoilValue } from 'recoil';
import { graphQLSelector, graphQLSelectorFamily } from 'recoil-relay';
import { Disposable, graphql, MutationParameters, Variables } from 'relay-runtime';
import { myEnvironmentKey } from '../exampleQuery';
import { Thread } from '../gql/graphql';
import { threadQuery$data } from './__generated__/threadQuery.graphql';
import { threadsQuery$data } from './__generated__/threadsQuery.graphql';

export const threadQuery = graphQLSelectorFamily({
  key: 'threadQuery',
  environment: myEnvironmentKey,
  query: graphql`
    query threadQuery($id: ID!) {
      node(id: $id) {
        id
        ... on Thread {
            name
          comments {
            id
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
    };
  },
});



export const useUpdateThreadCommitEvent = (): readonly [
  (config: UseMutationConfig<MutationParameters>) => Disposable,
  boolean,
] => {
  const [commit, isInFlight] = useMutation(
    graphql`
      mutation threadUpdateThreadMutation(
        $input: UpdateThreadInput!
      ) {
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
