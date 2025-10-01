import { z } from 'zod'

import { EValidationMessage } from '@/domain/common/validation/enum'

const PreCloseSessionSchema = z.object({
  id: z.string().nonoptional(EValidationMessage.REQUIRED),
  image: z.file(EValidationMessage.REQUIRED),
})

export { PreCloseSessionSchema }
