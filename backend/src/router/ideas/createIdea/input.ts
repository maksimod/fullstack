import { zNickRequired, zStringMin, zStringRequired } from '@vscode_frontend/shared/src/zod'
import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: zStringRequired,
  nick: zNickRequired,
  description: zStringRequired,
  text: zStringMin(100),
  images: z.array(zStringRequired),
})
