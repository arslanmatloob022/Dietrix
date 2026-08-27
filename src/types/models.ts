export type ServiceItem = {
    id: string
    title: string
    summary: string
    features: string[]
    priceFrom: string
    ctaText: string
}

export type PricingTier = {
    id: string
    name: string
    price: string
    billing: string
    description: string
    features: string[]
    highlighted: boolean
    scarcity: string
    ctaText: string
}

export type Testimonial = {
    id: string
    name: string
    location: string
    rating: number
    goal: string
    result: string
    quote: string
    beforeLabel: string
    afterLabel: string
    image: string
}

export type Transformation = {
    id: string
    name: string
    timeline: string
    focus: string
    beforeMetric: string
    afterMetric: string
    image: string
}

export type FaqItem = {
    id: string
    question: string
    answer: string
}

export type StatItem = {
    id: string
    label: string
    value: string
}

export type TrustBadge = {
    id: string
    label: string
    subtitle: string
}

export type BlogCategory = 'Weight Loss' | 'Diet Plans' | 'Health Conditions'

export type BlogTable = {
    caption?: string
    columns: string[]
    rows: string[][]
    footnote?: string
}

export type BlogSection = {
    heading: string
    subheading?: string
    paragraphs: string[]
    bullets?: string[]
    steps?: string[]
    table?: BlogTable
    callout?: string
    links?: InternalLink[]
}

export type BlogFaq = {
    question: string
    answer: string
}

export type BlogSource = {
    label: string
    detail?: string
}

export type InternalLink = {
    label: string
    to: string
}

export type BlogPost = {
    slug: string
    title: string
    seoTitle: string
    seoDescription: string
    category: BlogCategory
    excerpt: string
    publishedAt: string
    updatedAt?: string
    /** Optional override. Omit to derive the badge from actual body length. */
    readTime?: string
    heroImage: string
    heroImageAlt?: string
    sections: BlogSection[]
    /** Written per article. Falls back to section headings when absent. */
    keyTakeaways?: string[]
    faqs?: BlogFaq[]
    sources?: BlogSource[]
    /** Curated blog-to-blog links, highest priority in the related module. */
    relatedSlugs?: string[]
    internalLinks: InternalLink[]
}

export type LeadSource = 'contact' | 'chatbot' | 'home-cta' | 'blog' | 'services'

export type LeadPayload = {
    name: string
    email: string
    goal: string
    source: LeadSource
}

export type BookingPayload = {
    name: string
    email: string
    healthGoal: string
    date: string
    time: string
    notes: string
}

export type SiteMeta = {
    title: string
    description: string
    path?: string
    canonicalPath?: string
    keywords?: string[]
    type?: 'website' | 'article' | 'profile'
    robots?: string
    image?: string
}
