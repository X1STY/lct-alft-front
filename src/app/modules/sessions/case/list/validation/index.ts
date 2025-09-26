import { z } from 'zod'


const GetSessionsPortSchema = z.object({
  status: z.number(),
  employeeId: z.string().optional(),
  kitId: z.string().optional(),
})

export { GetSessionsPortSchema }
