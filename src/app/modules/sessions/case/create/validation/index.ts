import { z } from 'zod'

import { EValidationMessage } from '@/domain/common/validation/enum'

const CreateSessionSchema = z.object({
  reciever_id: z.string().nonoptional(EValidationMessage.REQUIRED),
  kit_id: z.string().nonoptional(EValidationMessage.REQUIRED),
  location_id: z.string().nonoptional(EValidationMessage.REQUIRED),
  image: z.file(EValidationMessage.REQUIRED),
})

export { CreateSessionSchema }
