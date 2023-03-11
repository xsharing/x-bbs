import { createYoga } from 'graphql-yoga';
import express, { type Request, type Response } from 'express';
import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
import { builder } from './pothos';
import { buildContext, GraphQLLocalStrategy } from 'graphql-passport';
import passport from 'passport';
import { AccountModel } from './models/account';
import { Strategy as JwtStrategy } from 'passport-jwt';

dotenv.config();
(await dynamoose.logger()).providers.set(console);

// TODO: fixme
dynamoose.aws.ddb.local('http://ddb:8000');

passport.use(
  new GraphQLLocalStrategy(
    { passReqToCallback: true },
    (req, email, password, done) => {
      // console.log('GraphQLLocalStrategy', email);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      AccountModel.get({
        id: '49cf5c68-bd3e-11ed-8c56-0242ac120003',
      })
        .then((account) => {
          done(null, { email: 'dummy@example.org', id: account.id });
        })
        .catch((err) => {
          done(err);
        });
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET ?? 'dummy',
      jwtFromRequest: (req) => {
        return req.headers.authorization?.split(' ')[1] ?? null;
      },
    },
    function (payload, done) {
      console.log(payload);
      done(null, payload);
    },
  ),
);

type TServerContext = Record<string, any> & {
  req: Request;
  res: Response;
};

const yoga = createYoga<TServerContext>({
  schema: builder.toSchema(),
  context: (initialContext) =>
    buildContext<{ email: string }>({ ...initialContext }),
});

const app = express();

app.use(passport.initialize());
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', yoga);

export const viteNodeApp = app;
