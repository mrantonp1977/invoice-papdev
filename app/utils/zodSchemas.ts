import { z } from 'zod'


export const onboardingSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  address: z.string().min(2).max(255),
})