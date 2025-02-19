import { zStringRequired } from '@vscode_frontend/shared/src/zod'
import { z } from 'zod'

export const zBlockIdeaTrpcInput = z.object({
  ideaId: zStringRequired,
})
