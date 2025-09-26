import type { z } from 'zod'

import type { GetSessionsPortSchema } from '@/app/modules/sessions/case/list/validation'

type IGetSessionsPort = z.infer<typeof GetSessionsPortSchema>

export type { IGetSessionsPort }
