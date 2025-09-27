import { z } from 'zod'

import { EValidationMessage } from '@/domain/common/validation/enum'

const CreateSessionSchema = z.object({
  reciever: z.string().nonempty(EValidationMessage.REQUIRED),
  kit: z.string().nonempty(EValidationMessage.REQUIRED),
  image: z.file(EValidationMessage.REQUIRED),
})

export { CreateSessionSchema }
