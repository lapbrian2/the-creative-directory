import { db, schema } from '~/server/db'
import { submissionSchema } from '~/server/utils/validation'
import { ZodError } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const validated = submissionSchema.parse(body)

    await db.insert(schema.submissions).values({
      name: validated.name,
      email: validated.email,
      category: validated.category,
      title: validated.title,
      bio: validated.bio,
      portfolioUrl: validated.portfolioUrl,
      location: validated.location || '',
    })

    return { success: true }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Validation failed',
        data: error.flatten().fieldErrors,
      })
    }
    console.error('[submissions] Error:', error instanceof Error ? error.message : error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
