import { cloudinaryUploadTypes } from '@vscode_frontend/shared/src/cloudinary'
import { getKeysAsArray } from '@vscode_frontend/shared/src/getKeysAsArray'
import { z } from 'zod'

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})
