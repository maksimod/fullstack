import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { TrpcRouter, createContext } from './trpc';

const expressApp = express();
expressApp.use(cors());

expressApp.get('/ping', (req, res) => {
  res.send('pong');
});

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: TrpcRouter,
    createContext,
  })
);

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000');
});