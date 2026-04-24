import type { SiteMeta } from '../types/models'

function upsertMeta(name: string, content: string) {
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute('name', name)
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

export function useSeo(meta: SiteMeta) {
    if (typeof document === 'undefined') {
        return
    }

    document.title = meta.title
    upsertMeta('description', meta.description)
}

export function upsertJsonLd(id: string, data: Record<string, unknown>) {
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
