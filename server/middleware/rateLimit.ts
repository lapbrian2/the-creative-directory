const counts = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

export default defineEventHandler((event) => {
  if (event.path !== '/api/submissions' || event.method !== 'POST') return

  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? event.node.req.socket.remoteAddress ?? 'unknown'
  const now = Date.now()

  const entry = counts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS }
  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + WINDOW_MS
  }

  entry.count++
  counts.set(ip, entry)

  if (entry.count > MAX_REQUESTS) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again later.' })
  }
})
