import { db, schema } from '~/server/db'
import { eq, like, or, sql } from 'drizzle-orm'
import { queryParamsSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const params = queryParamsSchema.parse(query)

  const conditions = []

  if (params.category !== 'all') {
    conditions.push(eq(schema.creatives.category, params.category))
  }

  if (params.featured !== undefined) {
    conditions.push(eq(schema.creatives.featured, params.featured))
  }

  if (params.search) {
    const term = `%${params.search}%`
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
})
