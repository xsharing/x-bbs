/**
 * @generated SignedSource<<911aca1f1f557dde4926f93016be8d68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateThreadInput = {
  name: string;
};
export type threadsCreateThreadMutation$variables = {
  input: CreateThreadInput;
};
export type threadsCreateThreadMutation$data = {
  readonly createThread: {
    readonly success: boolean;
  };
};
export type threadsCreateThreadMutation = {
  response: threadsCreateThreadMutation$data;
  variables: threadsCreateThreadMutation$variables;
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
    "concreteType": "CreateThreadPayload",
    "kind": "LinkedField",
    "name": "createThread",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
    "name": "threadsCreateThreadMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "threadsCreateThreadMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "937b957e59ac105c43ba9b95bc67eec7",
    "id": null,
    "metadata": {},
    "name": "threadsCreateThreadMutation",
    "operationKind": "mutation",
    "text": "mutation threadsCreateThreadMutation(\n  $input: CreateThreadInput!\n) {\n  createThread(input: $input) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "e6c5d8c63cbd7738a26947bd8798982b";

export default node;
