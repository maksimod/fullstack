import { type User } from '@prisma/client'
import { pick } from '@vscode_frontend/shared/src/pick'

export const toClientMe = (user: User | null) => {
  return user && pick(user, ['id', 'nick', 'name', 'permissions', 'email', 'avatar'])
}
