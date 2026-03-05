import { relations } from 'drizzle-orm'
import { creatives, portfolioItems } from './schema'

export const creativesRelations = relations(creatives, ({ many }) => ({
  portfolioItems: many(portfolioItems),
}))

export const portfolioItemsRelations = relations(portfolioItems, ({ one }) => ({
  creative: one(creatives, {
    fields: [portfolioItems.creativeId],
    references: [creatives.id],
  }),
}))
