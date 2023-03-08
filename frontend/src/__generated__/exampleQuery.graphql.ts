/**
 * @generated SignedSource<<4aa6daa2dc7dc25b412c190f189efd8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type exampleQuery$variables = {};
export type exampleQuery$data = {
  readonly threads: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly name: string | null;
      };
    } | null>;
  };
};
export type exampleQuery = {
  response: exampleQuery$data;
  variables: exampleQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryThreadsConnection",
        "kind": "LinkedField",
        "name": "threads",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueryThreadsConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Thread",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "exampleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryThreadsConnection",
        "kind": "LinkedField",
        "name": "threads",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueryThreadsConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Thread",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ee904f48f0ae5b0ad92d63d4d36d6a9f",
    "id": null,
    "metadata": {},
    "name": "exampleQuery",
    "operationKind": "query",
    "text": "query exampleQuery {\n  threads {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e33658897754fa7f2eeddcb27c48eb6b";

export default node;
