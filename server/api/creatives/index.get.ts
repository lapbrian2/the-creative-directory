import { db, schema } from '~/server/db'
import { eq, like, or, sql } from 'drizzle-orm'
import { queryParamsSchema } from '~/server/utils/validation'
import { ZodError } from 'zod'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  let params
  try {
    params = queryParamsSchema.parse(query)
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({ statusCode: 422, statusMessage: 'Invalid query parameters' })
    }
    throw createError({ statusCode: 400, statusMessage: 'Bad request' })
  }

  try {
    const conditions = []

    if (params.category !== 'all') {
      conditions.push(eq(schema.creatives.category, params.category))
    }

    if (params.featured !== undefined) {
      conditions.push(eq(schema.creatives.featured, params.featured))
    }

    if (params.search) {
      const escaped = params.search.replace(/[%_\\]/g, '\\$&')
      const term = `%${escaped}%`
      conditions.push(
        or(
          like(schema.creatives.name, term),
          like(schema.creatives.title, term),
          like(schema.creatives.bio, term),
        )!,
      )
    }

    const where = conditions.length > 0
      ? sql`${sql.join(conditions, sql` AND `)}`
      : undefined

    const rows = await db.query.creatives.findMany({
      where,
      with: {
        portfolioItems: {
          orderBy: (items, { asc }) => [asc(items.sortOrder)],
        },
      },
      limit: params.limit,
      offset: params.offset,
    })

    return rows
  } catch (error) {
    console.error('[creatives] Error:', error instanceof Error ? error.message : error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
