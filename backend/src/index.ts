import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'  // Добавьте этот импорт

const expressApp = express()

// Добавьте CORS middleware
expressApp.use(cors({
  origin: 'http://localhost:5173', // URL вашего фронтенда
  credentials: true
}))

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
)

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})