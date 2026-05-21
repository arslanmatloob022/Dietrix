import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { routerOptions } from './router'
import { useBookingStore } from './stores/booking'
import { useLeadStore } from './stores/leads'

type AnalyticsWindow = Window & {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
}

const googleAnalyticsId = import.meta.env.VITE_GA_ID as string | undefined

function initializeAnalytics() {
    if (!googleAnalyticsId || typeof window === 'undefined') {
        return
    }

    const analyticsWindow = window as AnalyticsWindow
    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
    analyticsWindow.gtag = (...args: unknown[]) => {
        analyticsWindow.dataLayer?.push(args)
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
    document.head.appendChild(script)

    analyticsWindow.gtag('js', new Date())
    analyticsWindow.gtag('config', googleAnalyticsId)
}

export const createApp = ViteSSG(
    App,
    routerOptions,
    ({ app, router }) => {
        const pinia = createPinia()

        app.use(pinia)

        if (import.meta.env.SSR) {
            return
        }

        const leadStore = useLeadStore(pinia)
        const bookingStore = useBookingStore(pinia)

        leadStore.initialize()
        bookingStore.initialize()
        initializeAnalytics()

        router.afterEach((to) => {
            if (!googleAnalyticsId || typeof window === 'undefined') {
                return
            }

            const analyticsWindow = window as AnalyticsWindow
            analyticsWindow.gtag?.('config', googleAnalyticsId, {
                page_path: to.fullPath,
            })
        })
    },
)
