import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
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

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

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

async function bootstrap() {
    await router.isReady()
    app.mount('#app')
}

bootstrap()
