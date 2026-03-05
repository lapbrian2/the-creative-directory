import { db, schema } from '~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const creative = await db.query.creatives.findFirst({
    where: eq(schema.creatives.slug, slug),
    with: {
      portfolioItems: {
        orderBy: (items, { asc }) => [asc(items.sortOrder)],
      },
    },
  })

  if (!creative) {
    throw createError({ statusCode: 404, statusMessage: 'Creative not found' })
  }

  return creative
})
