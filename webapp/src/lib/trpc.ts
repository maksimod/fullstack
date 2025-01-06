import { createTRPCReact } from '@trpc/react-query'
import type { TrpcRouter } from '@vscode_frontend/backend/src/trpc'

export const trpc = createTRPCReact<TrpcRouter>()