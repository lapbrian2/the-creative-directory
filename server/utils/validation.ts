import { z } from 'zod'

export const submissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  category: z.enum(['ai-artist', 'designer', 'builder'], {
    required_error: 'Please select a category',
  }),
  title: z.string().min(2, 'Title must be at least 2 characters').max(100),
  bio: z.string().min(20, 'Bio must be at least 20 characters').max(2000),
  portfolioUrl: z.string().url('Please enter a valid URL'),
  location: z.string().max(100).optional().default(''),
})

export type SubmissionInput = z.infer<typeof submissionSchema>

export const queryParamsSchema = z.object({
  category: z.enum(['all', 'ai-artist', 'designer', 'builder']).optional().default('all'),
  search: z.string().optional().default(''),
  featured: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
})
