import { useMutation, type UseMutationConfig } from 'react-relay';
import { graphQLSelector } from 'recoil-relay';
import {
  type Disposable,
  graphql,
  type MutationParameters,
} from 'relay-runtime';
import { type QueryGroupsConnection } from '../gql/graphql';
import { myEnvironmentKey } from '../graphql';
import { type groupsCreateGroupMutation } from './__generated__/groupsCreateGroupMutation.graphql';

export const groupsQuery = graphQLSelector({
  key: 'groupsQuery',
  environment: myEnvironmentKey,
  query: graphql`
    query groupsQuery($first: Int) {
      groups(first: $first) @connection(key: "connection__groups") {
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
    response: { groups: QueryGroupsConnection & { __id: string } },
    callbacks,
  ) {
    return {
      nodes: response.groups.edges.map((edge) => edge.node),
      edgesConnectionId: response.groups.__id,
    };
  },
});

export const useCreateGroupCommitEvent = (): readonly [
  (config: UseMutationConfig<MutationParameters>) => Disposable,
  boolean,
] => {
  const [commit, isInFlight] = useMutation<groupsCreateGroupMutation>(
    graphql`
      mutation groupsCreateGroupMutation(
        $connections: [ID!]!
        $input: CreateGroupInput!
      ) {
        createGroup(input: $input) {
          success
          groupEdge {
            cursor

            node
              @appendNode(
                connections: $connections
                edgeTypeName: "GroupEdge"
              ) {
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
