import { type UseMutationConfig, useMutation } from "react-relay";
import { type Disposable, graphql } from "relay-runtime";
import { type authLoginMutation } from "./__generated__/authLoginMutation.graphql";

export const useLoginCommitEvent = (): readonly [
    (config: UseMutationConfig<authLoginMutation>) => Disposable,
    boolean,
  ] => {
    const [commit, isInFlight] = useMutation<authLoginMutation>(
      graphql`
        mutation authLoginMutation(
          $input: LoginInput!
        ) {
          login(input: $input)
        }
      `,
    );
    return [commit, isInFlight] as const;
  };
  