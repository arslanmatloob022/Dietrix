import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useBookingStore } from './stores/booking'
import { useLeadStore } from './stores/leads'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const leadStore = useLeadStore(pinia)
const bookingStore = useBookingStore(pinia)

leadStore.initialize()
bookingStore.initialize()

async function bootstrap() {
    await router.isReady()
    app.mount('#app')
}

bootstrap()
