import { z } from 'zod'

import { EValidationMessage } from '@/domain/common/validation/enum'

const TestManyImagesSchema = z.object({
  image: z.array(z.file(EValidationMessage.REQUIRED)),
})

export { TestManyImagesSchema }
