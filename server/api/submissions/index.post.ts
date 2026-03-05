import { db, schema } from '~/server/db'
import { submissionSchema } from '~/server/utils/validation'
import { ZodError } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const validated = submissionSchema.parse(body)

    const [submission] = await db.insert(schema.submissions).values({
      name: validated.name,
      email: validated.email,
      category: validated.category,
      title: validated.title,
      bio: validated.bio,
      portfolioUrl: validated.portfolioUrl,
      location: validated.location || '',
    }).returning()

    return { success: true, id: submission.id }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Validation failed',
        data: error.flatten().fieldErrors,
      })
    }
    throw error
  }
})
