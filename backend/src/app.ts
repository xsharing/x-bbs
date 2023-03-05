import express from "express";
import { server } from ".";
import cors from "cors";
import bodyParser from "body-parser";
import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4';

const app = express();
const httpServer = http.createServer(app);
server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }))

await server.start();

app.use(
  cors(),
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server),
);



if (import.meta.env.PROD)
  app.listen(3000);

export const viteNodeApp = app;