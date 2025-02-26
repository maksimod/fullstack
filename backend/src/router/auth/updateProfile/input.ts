import { zNickRequired } from '@vscode_frontend/shared/src/zod'
import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  nick: zNickRequired,
  name: z.string().max(50).default(''),
  avatar: z.string().nullable(),
})
