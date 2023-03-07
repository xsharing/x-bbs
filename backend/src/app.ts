import { createYoga } from 'graphql-yoga';
import SchemaBuilder from '@pothos/core';
import express from 'express';
import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { ThreadItem, ThreadModel } from './models';
import RelayPlugin, { encodeGlobalID } from '@pothos/plugin-relay';
import { CommentItem, CommentModel } from './models/comment';

dotenv.config();

// TODO: fixme
dynamoose.aws.ddb.local('http://ddb:8000');

const builder = new SchemaBuilder({
  plugins: [RelayPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'ID',
  },
});

const CommentType = builder.objectType(CommentItem, {
  name: 'Comment',
  description: 'a comment',
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => encodeGlobalID('Comment', parent.id),
    }),
    threadId: t.exposeString('threadId'),
    body: t.exposeString('body'),
  }),
});

const ThreadType = builder.objectType(ThreadItem, {
  name: 'Thread',
  description: 'a thread',
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => encodeGlobalID('Thread', parent.id),
    }),
    name: t.exposeString('name', {nullable: true}),
    comments: t.field({
      type: [CommentType],
      resolve: async (parent) =>
        await CommentModel.scan('threadId').eq(parent.id).exec(),
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    threads: t.field({
      type: [ThreadType],
      resolve: async () => await ThreadModel.scan().exec(),
    }),
  }),
});

const yoga = createYoga({
  schema: builder.toSchema(),
});

const app = express();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', yoga);

export const viteNodeApp = app;
