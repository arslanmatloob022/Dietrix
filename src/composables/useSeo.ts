import { useHead } from '@unhead/vue'
import type { SiteMeta } from '../types/models'
import { absoluteUrl, siteName } from '../data/site'

const DEFAULT_SOCIAL_IMAGE = absoluteUrl('/media/dietrix-social-card.png')

function upsertMeta(name: string, content: string) {
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute('name', name)
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

function upsertProperty(property: string, content: string) {
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null

    if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
    }

    element.setAttribute('href', href)
}

export function useSeo(meta: SiteMeta) {
    const canonicalPath = meta.canonicalPath ?? meta.path ?? '/'
    const canonicalUrl = absoluteUrl(canonicalPath)
    const robots = meta.robots ?? 'index, follow, max-image-preview:large'
    const type = meta.type === 'article' ? 'article' : 'website'
    const keywords = meta.keywords?.join(', ') ?? ''
    const image = meta.image ?? DEFAULT_SOCIAL_IMAGE
    const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined

    if (import.meta.env.SSR) {
        useHead({
            title: meta.title,
            meta: [
                { name: 'description', content: meta.description },
                { name: 'robots', content: robots },
                { name: 'keywords', content: keywords },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: meta.title },
                { name: 'twitter:description', content: meta.description },
                { name: 'twitter:image', content: image },
                ...(googleVerification ? [{ name: 'google-site-verification', content: googleVerification }] : []),
            ],
            link: [
                { rel: 'canonical', href: canonicalUrl },
                { rel: 'alternate', hreflang: 'en', href: canonicalUrl },
                { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
            ],
            script: [],
        })

        useHead({
            meta: [
                { property: 'og:type', content: type },
                { property: 'og:site_name', content: siteName },
                { property: 'og:title', content: meta.title },
                { property: 'og:description', content: meta.description },
                { property: 'og:url', content: canonicalUrl },
                { property: 'og:image', content: image },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
            ],
        })
        return
    }

    if (typeof document === 'undefined') {
        return
    }

    document.title = meta.title
    upsertMeta('description', meta.description)
    upsertMeta('robots', robots)
    upsertMeta('keywords', keywords)
    upsertMeta('twitter:card', 'summary_large_image')
    upsertMeta('twitter:title', meta.title)
    upsertMeta('twitter:description', meta.description)
    upsertMeta('twitter:image', image)

    if (googleVerification) {
        upsertMeta('google-site-verification', googleVerification)
    }

    upsertProperty('og:image', image)
    upsertProperty('og:type', type)
    upsertProperty('og:site_name', siteName)
    upsertProperty('og:title', meta.title)
    upsertProperty('og:description', meta.description)
    upsertProperty('og:url', canonicalUrl)
    upsertLink('canonical', canonicalUrl)
}

export function upsertJsonLd(id: string, data: Record<string, unknown>) {
    if (import.meta.env.SSR) {
        useHead({
            script: [
                {
                    key: id,
                    id,
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(data),
                },
            ],
        })
        return
    }

    if (typeof document === 'undefined') {
        return
    }

    let script = document.getElementById(id) as HTMLScriptElement | null

    if (!script) {
        script = document.createElement('script')
        script.id = id
        script.type = 'application/ld+json'
        document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(data)
}

export function removeJsonLd(id: string) {
    if (import.meta.env.SSR) {
        return
    }

    if (typeof document === 'undefined') {
        return
    }

    document.getElementById(id)?.remove()
}
