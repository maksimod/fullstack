import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { TrpcRouter } from './trpc'
import cors from 'cors'

const expressApp = express()
expressApp.use(cors())
expressApp.get('/ping', (req, res) => {
    res.send('pong')
})

expressApp.use(
    '/trpc', 
    trpcExpress.createExpressMiddleware({
        router: TrpcRouter,
    })
)

expressApp.listen(3000, () => {
    console.info('Listening at http://localhost:3000')
})  

