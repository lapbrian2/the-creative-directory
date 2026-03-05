import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'
import './relations'

const url = process.env.TURSO_DATABASE_URL || 'file:local.db'
const authToken = process.env.TURSO_AUTH_TOKEN

if (url.startsWith('libsql://') || url.startsWith('https://')) {
  if (!authToken) {
    throw new Error('TURSO_AUTH_TOKEN is required for remote database connections')
  }
}

const client = createClient({ url, authToken })

export const db = drizzle(client, { schema })
export { schema }
