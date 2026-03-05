export type Category = 'ai-artist' | 'designer' | 'builder'

export interface Creative {
  id: number
  slug: string
  name: string
  title: string
  category: Category
  bio: string
  avatar: string
  portfolioItems: PortfolioItem[]
  links: { label: string; url: string }[]
  tags: string[]
  featured: boolean
  location: string
}

export interface PortfolioItem {
  id: number
  creativeId: number
  title: string
  image: string
  description: string
  sortOrder: number
}

export const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Creatives' },
  { value: 'ai-artist', label: 'AI Artists' },
  { value: 'designer', label: 'Designers' },
  { value: 'builder', label: 'Builders' },
]
