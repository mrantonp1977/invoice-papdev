import { z } from 'zod'


export const onboardingSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  address: z.string().min(2).max(255),
})

export const invoiceSchema = z.object({
  invoiceName: z.string().min(2).max(255),
  total: z.number().min(1, 'Total must be greater than 0'),
  status: z.enum(['PAID', 'PENDING']).default('PENDING'),
  date: z.string().min(1),
  dueDate: z.number().min(0),
  fromName: z.string().min(2).max(255),
  fromEmail: z.string().email(),
  fromAddress: z.string().min(2).max(255),
  clientName: z.string().min(2).max(255),
  clientEmail: z.string().email(),
  clientAddress: z.string().min(2).max(255),
  currency: z.string().min(2).max(255),
  invoiceNumber: z.string().min(2).max(255),
  notes: z.string().optional(),
  invoiceItemDescription: z.string().min(2).max(255),
  invoiceItemQuantity: z.number().min(1),
  invoiceItemRate: z.number().min(1), 
})