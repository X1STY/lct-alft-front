import type { ISessionDto } from '@/domain/session/interface/dto'

import type { z } from 'zod'

import type { GetSessionsPortSchema } from '@/app/modules/sessions/case/list/validation'

import type { CreateSessionSchema } from '@/app/modules/sessions/case/create/validation'

import type { PreCloseSessionSchema } from '@/app/modules/sessions/case/preclose/validation'

type IGetSessionsPort = z.infer<typeof GetSessionsPortSchema>

type ICreateSessionPort = z.infer<typeof CreateSessionSchema>

type IOpenSessionPort = Pick<ISessionDto, 'id'>

type IPreCloseSessionPort = z.infer<typeof PreCloseSessionSchema>

type ICloseSessionPort = Pick<ISessionDto, 'id'>

export type { IGetSessionsPort, ICreateSessionPort, IOpenSessionPort, ICloseSessionPort, IPreCloseSessionPort }
