import { useMutation, type UseMutationConfig } from 'react-relay';
import {
  type Disposable,
  graphql,
  type MutationParameters,
} from 'relay-runtime';

export const useAddCommentCommitEvent = (): readonly [
  (config: UseMutationConfig<MutationParameters>) => Disposable,
  boolean,
] => {
  const [commit, isInFlight] = useMutation(
    graphql`
      mutation commentsAddCommentMutation(
        $connections: [ID!]!
        $input: AddCommentInput!
      ) {
        addComment(input: $input) {
          success
          commentEdge {
            cursor

            node
              @appendNode(
                connections: $connections
                edgeTypeName: "CommentEdge"
              ) {
              id
              body
            }
          }
        }
      }
    `,
  );
  return [commit, isInFlight] as const;
};
