import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const creatives = sqliteTable('creatives', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  category: text('category', { enum: ['ai-artist', 'designer', 'builder'] }).notNull(),
  bio: text('bio').notNull(),
  avatar: text('avatar').notNull(),
  location: text('location').notNull().default(''),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  tags: text('tags', { mode: 'json' }).notNull().$type<string[]>(),
  links: text('links', { mode: 'json' }).notNull().$type<{ label: string; url: string }[]>(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (t) => [
  index('creatives_category_idx').on(t.category),
  index('creatives_featured_idx').on(t.featured),
])

export const portfolioItems = sqliteTable('portfolio_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  creativeId: integer('creative_id').notNull().references(() => creatives.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
}, (t) => [
  index('portfolio_items_creative_id_idx').on(t.creativeId),
])

export const submissions = sqliteTable('submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  category: text('category', { enum: ['ai-artist', 'designer', 'builder'] }).notNull(),
  title: text('title').notNull(),
  bio: text('bio').notNull(),
  portfolioUrl: text('portfolio_url').notNull(),
  location: text('location').notNull().default(''),
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).notNull().default('pending'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

export const pageViews = sqliteTable('page_views', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull(),
  referrer: text('referrer'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (t) => [
  index('page_views_path_idx').on(t.path),
  index('page_views_created_at_idx').on(t.createdAt),
])
