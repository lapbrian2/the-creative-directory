export function useDirectoryJsonLd() {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'The Creative Directory',
          description: 'A curated directory of AI artists, graphic designers, and builders shaping the future of creative work.',
          url: 'https://the-creative-directory.vercel.app',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://the-creative-directory.vercel.app/?search={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      },
    ],
  })
}

export function useCreativeJsonLd(creative: {
  name: string
  title: string
  bio: string
  avatar: string
  slug: string
  location: string
  links: { label: string; url: string }[]
}) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: creative.name,
          jobTitle: creative.title,
          description: creative.bio,
          image: creative.avatar,
          url: `https://the-creative-directory.vercel.app/creatives/${creative.slug}`,
          address: creative.location ? { '@type': 'PostalAddress', addressLocality: creative.location } : undefined,
          sameAs: creative.links.filter(l => l.url !== '#').map(l => l.url),
        }),
      },
    ],
  })
}
