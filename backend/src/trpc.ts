import {initTRPC} from '@trpc/server'

const ideas = [
    {id: 1, title: 'Idea 1', description: 'Description 1'},
    {id: 2, title: 'Idea 2', description: 'Description 2'},
    {id: 3, title: 'Idea 3', description: 'Description 3'},
    {id: 4, title: 'Idea 4', description: 'Description 4'},
    {id: 5, title: 'Idea 5', description: 'Description 5'},
]

const trpc = initTRPC.create()

export const TrpcRouter = trpc.router({
    getIdeas: trpc.procedure.query(() => {
        return {ideas}
    })
})

export type TRPCRouter = typeof TrpcRouter