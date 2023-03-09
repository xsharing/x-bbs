import { selector, type GetRecoilValue } from 'recoil';
import { graphQLSelector } from 'recoil-relay';
import { graphql, type Variables } from 'relay-runtime';
import { myEnvironmentKey } from '../exampleQuery';
import {
  type threadsQuery$data,
} from './__generated__/threadsQuery.graphql';

export const threadsQuery = graphQLSelector(
  {
    key: 'threadsQuery',
    environment: myEnvironmentKey,
    query: graphql`
      query threadsQuery {
        threads {
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
      return response.threads.edges.map(edge => edge.node);
    },
  },
);
