import { useHead } from '@unhead/vue'
import type { SiteMeta } from '../types/models'
import { absoluteUrl, siteName } from '../data/site'

function upsertMeta(name: string, content: string) {
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute('name', name)
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

function removeMeta(name: string) {
    document.querySelector(`meta[name="${name}"]`)?.remove()
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

function removeProperty(property: string) {
    document.querySelector(`meta[property="${property}"]`)?.remove()
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
    const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined

    if (import.meta.env.SSR) {
        useHead({
            title: meta.title,
            meta: [
                { name: 'description', content: meta.description },
                { name: 'robots', content: robots },
                { name: 'keywords', content: keywords },
                { name: 'twitter:card', content: meta.image ? 'summary_large_image' : 'summary' },
                { name: 'twitter:title', content: meta.title },
                { name: 'twitter:description', content: meta.description },
                ...(googleVerification ? [{ name: 'google-site-verification', content: googleVerification }] : []),
                ...(meta.image ? [{ name: 'twitter:image', content: meta.image }] : []),
            ],
            link: [{ rel: 'canonical', href: canonicalUrl }],
            script: [],
        })

        useHead({
            meta: [
                { property: 'og:type', content: type },
                { property: 'og:site_name', content: siteName },
                { property: 'og:title', content: meta.title },
                { property: 'og:description', content: meta.description },
                { property: 'og:url', content: canonicalUrl },
                ...(meta.image ? [{ property: 'og:image', content: meta.image }] : []),
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
    upsertMeta('twitter:card', meta.image ? 'summary_large_image' : 'summary')
    upsertMeta('twitter:title', meta.title)
    upsertMeta('twitter:description', meta.description)

    if (googleVerification) {
        upsertMeta('google-site-verification', googleVerification)
    }

    if (meta.image) {
        upsertMeta('twitter:image', meta.image)
        upsertProperty('og:image', meta.image)
    } else {
        removeMeta('twitter:image')
        removeProperty('og:image')
    }

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
