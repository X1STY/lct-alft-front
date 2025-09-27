import type { z } from 'zod'

import type { GetSessionsPortSchema } from '@/app/modules/sessions/case/list/validation'

import type { CreateSessionSchema } from '@/app/modules/sessions/case/create/validation'

type IGetSessionsPort = z.infer<typeof GetSessionsPortSchema>

type ICreateSessionPort = z.infer<typeof CreateSessionSchema>

export type { IGetSessionsPort, ICreateSessionPort }
