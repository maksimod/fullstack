import { zStringRequired } from '@vscode_frontend/shared/src/zod'

import { zCreateIdeaTrpcInput } from '../createIdea/input'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  ideaId: zStringRequired,
})
