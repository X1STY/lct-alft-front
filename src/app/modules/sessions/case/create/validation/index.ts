import { z } from 'zod'

import { EValidationMessage } from '@/domain/common/validation/enum'

const CreateSessionSchema = z.object({
  receiver_id: z.number(EValidationMessage.REQUIRED).nonoptional(EValidationMessage.REQUIRED),
  kit_id: z.number(EValidationMessage.REQUIRED).nonoptional(EValidationMessage.REQUIRED),
  location_id: z.number(EValidationMessage.REQUIRED).nonoptional(EValidationMessage.REQUIRED),
  image: z.file(EValidationMessage.REQUIRED),
})

export { CreateSessionSchema }
