import { initTRPC } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// Создайте контекст
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return { req, res };
};
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// Создайте маршруты (routers)
export const TrpcRouter = t.router({
  getIdeas: t.procedure.query(() => {
    return {
      ideas: [
        { id: 1, title: 'Idea 1', description: 'Description 1' },
        { id: 2, title: 'Idea 2', description: 'Description 2' },
      ],
    };
  }),
});

export type AppRouter = typeof TrpcRouter;