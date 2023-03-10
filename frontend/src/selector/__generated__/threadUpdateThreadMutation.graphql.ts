/**
 * @generated SignedSource<<ae3df614cf0b46234a17b4bdb478dac5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateThreadInput = {
  id: string;
  name: string;
};
export type threadUpdateThreadMutation$variables = {
  input: UpdateThreadInput;
};
export type threadUpdateThreadMutation$data = {
  readonly updateThread: {
    readonly success: boolean;
    readonly threadEdge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly name: string | null;
      };
    };
  };
};
export type threadUpdateThreadMutation = {
  response: threadUpdateThreadMutation$data;
  variables: threadUpdateThreadMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateThreadPayload",
    "kind": "LinkedField",
    "name": "updateThread",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ThreadEdge",
        "kind": "LinkedField",
        "name": "threadEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Thread",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "threadUpdateThreadMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "threadUpdateThreadMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f1b7b8b39fe393b25034aebf55d19927",
    "id": null,
    "metadata": {},
    "name": "threadUpdateThreadMutation",
    "operationKind": "mutation",
    "text": "mutation threadUpdateThreadMutation(\n  $input: UpdateThreadInput!\n) {\n  updateThread(input: $input) {\n    success\n    threadEdge {\n      cursor\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b9cc6930410a4de5c794ee5ce7b5f3c";

export default node;
