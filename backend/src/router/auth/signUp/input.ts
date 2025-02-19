import { zEmailRequired, zNickRequired, zStringRequired } from '@vscode_frontend/shared/src/zod'
import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: zNickRequired,
  email: zEmailRequired,
  password: zStringRequired,
})
