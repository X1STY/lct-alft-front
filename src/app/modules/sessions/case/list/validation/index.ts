import { z } from 'zod'

const GetSessionsPortSchema = z.object({
  status: z.string(),
  employeeId: z.string().optional(),
  locationId: z.string().optional(),
})

export { GetSessionsPortSchema }
