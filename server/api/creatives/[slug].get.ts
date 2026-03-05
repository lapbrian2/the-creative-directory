import { db, schema } from '~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  try {
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
  } catch (error) {
    if ((error as { statusCode?: number }).statusCode) throw error
    console.error('[creatives/slug] Error:', error instanceof Error ? error.message : error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
