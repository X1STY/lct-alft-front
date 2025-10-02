import type { z } from 'zod'

import type { TestManyImagesSchema } from '@/app/modules/test-many-images/case/list/validation'

type ITestManyImagesPort = z.infer<typeof TestManyImagesSchema>

export type { ITestManyImagesPort }
