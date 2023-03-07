import { createYoga } from 'graphql-yoga';
import express from 'express';
import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { builder } from './pothos';

dotenv.config();

// TODO: fixme
dynamoose.aws.ddb.local('http://ddb:8000');

const yoga = createYoga({
  schema: builder.toSchema(),
});

const app = express();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', yoga);

export const viteNodeApp = app;
