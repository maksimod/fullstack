import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors' // Добавьте этот импорт

import express from 'express'
import { trpcRouter } from './trpc'

const expressApp = express()

expressApp.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
)

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  }),
)

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
